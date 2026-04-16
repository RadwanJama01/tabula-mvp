// OCR wrapper around tesseract.js.
// Returns words with bounding boxes so the redactor can black out precise regions.

const path = require('node:path');
const fs = require('node:fs');

let tesseractWorker = null;

async function getWorker() {
  if (tesseractWorker) return tesseractWorker;
  const { createWorker } = require('tesseract.js');
  tesseractWorker = await createWorker('eng');
  return tesseractWorker;
}

/**
 * OCR an image file.
 * tesseract.js v5+ stopped returning per-word bboxes by default — you
 * have to opt in via the `blocks: true` output flag. Without it `data.words`
 * is undefined and the redaction pipeline silently detects PII but can't
 * locate it on the image, producing a "redacted" file identical to the
 * original.
 * @param {string} imagePath - absolute path to PNG/JPG
 * @returns {Promise<{text: string, words: Array<{text, bbox}>}>}
 */
async function ocrImage(imagePath) {
  const worker = await getWorker();
  const { data } = await worker.recognize(imagePath, {}, { blocks: true });

  // In v5+, words live inside data.blocks[].paragraphs[].lines[].words[].
  // Flatten them out, and fall back to data.words if the block structure
  // isn't present (older versions).
  let words = data.words || [];
  if ((!words || words.length === 0) && Array.isArray(data.blocks)) {
    words = [];
    for (const block of data.blocks) {
      for (const para of block.paragraphs || []) {
        for (const line of para.lines || []) {
          for (const w of line.words || []) words.push(w);
        }
      }
    }
  }

  return {
    text: data.text,
    words: words.map(w => ({
      text: w.text,
      bbox: w.bbox, // { x0, y0, x1, y1 }
      confidence: w.confidence,
    })),
  };
}

/**
 * OCR a PDF by rasterizing pages first, then running tesseract on each.
 * Returns per-page results.
 * @param {string} pdfPath
 * @returns {Promise<Array<{page, width, height, text, words, imagePath}>>}
 */
async function ocrPdf(pdfPath) {
  const pageImages = await rasterizePdf(pdfPath);
  const results = [];
  for (const pg of pageImages) {
    const ocr = await ocrImage(pg.imagePath);
    results.push({ ...pg, ...ocr });
  }
  return results;
}

/**
 * Rasterize each page of a PDF to a temporary PNG file.
 * pdfjs-dist >= 4 is ESM-only, so we use dynamic import from CommonJS.
 */
async function rasterizePdf(pdfPath) {
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const { createCanvas } = require('canvas');
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const loadingTask = pdfjs.getDocument({ data });
  const pdf = await loadingTask.promise;

  const results = [];
  const tmpDir = path.join(require('os').tmpdir(), `tabula-pdfpages-${Date.now()}`);
  fs.mkdirSync(tmpDir, { recursive: true });

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2.0 }); // 2x for better OCR
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d');
    await page.render({ canvasContext: ctx, viewport }).promise;

    const outPath = path.join(tmpDir, `page-${pageNum}.png`);
    fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
    results.push({ page: pageNum, width: viewport.width, height: viewport.height, imagePath: outPath });
  }
  return results;
}

async function terminate() {
  if (tesseractWorker) {
    await tesseractWorker.terminate();
    tesseractWorker = null;
  }
}

module.exports = { ocrImage, ocrPdf, terminate };
