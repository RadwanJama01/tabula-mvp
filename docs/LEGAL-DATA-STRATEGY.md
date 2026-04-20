# Legal Data Integration Strategy: Verdict, Settlement & Case Intelligence

*Research brief for Tabula AI platform — April 2026*

---

## The Problem

Sstieglitz's core feedback: **"Show me comparable verdicts."** Our current case valuation uses a pain-and-suffering multiplier + an AI-estimated range from Claude. Neither produces citable precedent. Without verifiable verdict citations, the PI valuation module is a calculator, not a legal tool — and it won't justify a $3K price point.

The legal data market is structured to extract maximum revenue from law firms. Every major verdict/settlement database sits behind expensive licensing walls that assume the buyer is a firm billing $400/hr. We're a startup trying to build a product. Different economics.

This document maps every viable data source, what it actually costs, what it actually contains, and recommends a phased approach that starts free and scales into paid integrations as revenue justifies the spend.

---

## The Landscape — Every Source We Evaluated

### Tier 1: Has API + Has Verdict Data + Accessible

#### Trellis Research
**Our recommended starting point.**

| | |
|---|---|
| **What it is** | State trial court research + analytics platform |
| **Coverage** | 45+ states, 3,500+ courts, 2,500+ counties, 2.5B+ records |
| **Verdict data** | Verdicts, arbitration awards, mediated settlements (CA and NY have deepest coverage, other states have rulings + dockets) |
| **API** | Yes — Trial Court Data API (v2, launched May 2024). REST API with webhooks for alerts, case refreshes, document purchases |
| **Unique value** | **Judge analytics** — ruling patterns, grant rates by motion type, tendencies by case type. No other platform offers this structured for trial courts |
| **Pricing** | Personal: $69.95/mo, Research: $129.95/mo, Research + Judge Analytics: $199.95/mo. Annual = 25% off. Enterprise/API: custom (contact sales) |
| **API pricing** | Not public — requires sales conversation. Likely $300-500/mo based on similar platforms |
| **Partnership precedent** | Partnered with Fisher Phillips (international law firm) to deliver AI-powered case strategy reports via automated alerts. Has similar programs with other firms. **Open to integration partnerships.** |
| **Data quality** | Structured, normalized, searchable. Covers judges, attorneys, parties, documents, events. AI-enhanced analytics |
| **Verdict search parameters** | Keyword, jurisdiction (state/county), case type, date range, judge, attorney, party |
| **Our fit** | Excellent. State trial courts are where PI cases live. Verdict search by jurisdiction + case type maps directly to the 6 parameters Sstieglitz wants. Judge analytics is a bonus he didn't ask for but will differentiate us |

**Trellis integration would look like:**
```
Case Valuation tab
├── 6 parameters (already built)
├── Claude AI Verdict Estimate (already built)
├── Trellis Comparable Verdicts
│   ├── "cervical herniation, auto accident, Travis County TX"
│   ├── Garcia v. State Farm (2024) — $72,000 verdict
│   ├── Chen v. Progressive (2023) — $91,000 settlement
│   └── 12 more comparable cases →
└── Trellis Judge Analytics
    └── "Judge Rodriguez, Travis County — median PI verdict $68K,
         grants defense MSJ 34%, average time to trial: 14 months"
```

**How to approach Trellis:**

Email their partnerships/sales team:

> We're building Tabula, a PI and bankruptcy case management platform with AI-powered document extraction and case valuation. We want to integrate Trellis verdict/settlement search and judge analytics into our case valuation workflow via your API. Our users are solo/small-firm PI attorneys.
>
> We're interested in:
> 1. API access for verdict/settlement search by jurisdiction + case type + injury
> 2. Judge analytics data (ruling patterns, grant rates)
> 3. Partnership pricing for a startup integrating your data into a legal SaaS product
>
> We're pre-revenue but have a design partner attorney (PI + estate) actively using the platform. Would love to explore a startup/partnership tier or trial API access.

**Why Trellis will likely say yes:**
- They're actively building a partner ecosystem (Fisher Phillips partnership)
- Our integration distributes their data to more attorneys (new channel)
- API is already built and documented
- Startup partnership tiers are common in legal tech

---

#### UniCourt
**The data infrastructure play.**

| | |
|---|---|
| **What it is** | Legal data API platform — think "Twilio for court data" |
| **Coverage** | 140M+ federal + state court records, 4,000+ courts, 40+ states, 2B+ dockets and documents |
| **Verdict data** | Court records and dockets — not specifically structured as "verdict amounts" like VerdictSearch, but contains judgment amounts within docket data |
| **API** | Yes — full REST API suite: Court Data API, Legal Analytics API, PACER API. Python SDK, detailed docs, engineering support |
| **Pricing** | Contact sales for API pricing. Billable per API call (search, case lookup, document download). Free access to their CrowdSourced Library for records that courts provide for free |
| **Data quality** | AI-normalized, structured. Good for docket tracking and case monitoring. Less structured for verdict-specific analytics compared to Trellis |
| **Our fit** | Good for case tracking and docket monitoring features (e.g., "alert me when opposing counsel files a motion"). Less useful for the specific verdict-comparison use case Sstieglitz wants |

**Verdict:** UniCourt is a better fit for a future "docket monitoring" feature than for the immediate verdict-comparison need. Park it.

---

#### Fastcase (via vLex)
**Free for bar members, limited API.**

| | |
|---|---|
| **What it is** | Legal research platform included with 80+ bar association memberships |
| **Coverage** | 400M+ documents — case law, statutes, regulations, docket sheets from federal + 25+ state courts |
| **Verdict data** | Case law opinions (not structured verdict/settlement amounts). Useful for legal research, less useful for "comparable verdicts" |
| **API** | Legal Data API exists — JSON, XML, LDML feeds. But as of May 2025, Fastcase is no longer sold separately outside bar memberships. API access requires specific licensing. Contact sales@fastcase.com |
| **Pricing** | Free via bar membership. API licensing: unknown, requires conversation |
| **Our fit** | Useful as a case-law citation engine (e.g., the AI assistant cites relevant statutes). Not useful for verdict dollar amounts. Low priority for the valuation use case |

---

### Tier 2: Has Verdict Data + No Public API

#### VerdictSearch (ALM / Law.com)
**The gold standard for verdict data, but walled.**

| | |
|---|---|
| **What it is** | The most comprehensive verdict/settlement database in the US |
| **Coverage** | 210,000+ detailed case reports, national coverage, updated daily |
| **Unique value** | Solicits feedback from BOTH winning and opposing attorneys on each case. Uses consistent data-collection criteria across jurisdictions. This makes the data uniquely reliable — it's not just court records, it's attorney-verified outcomes |
| **Verdict search** | Text search + 15 search criteria including jurisdiction, case type, injury type, verdict amount range, attorney, judge |
| **API** | **No public API found in research.** Would require a partnership conversation with ALM Media |
| **Pricing** | Custom — contact ALM for multi-user pricing. Free trial available. Single-user pricing not publicly listed for 2026 |
| **Our fit** | The data is exactly what Sstieglitz wants, but the lack of API makes integration uncertain. Would need to negotiate a data-licensing or API partnership with ALM. This is a 2-4 month sales process |

**Verdict:** Dream data source, but the integration path is unclear and slow. Not a starting point.

---

#### LexisNexis Verdict & Settlement Analyzer
**Enterprise, no startup path.**

| | |
|---|---|
| **What it is** | LexisNexis' verdict/settlement analysis tool |
| **Verdict data** | Extensive — part of the Lexis research platform |
| **API** | Enterprise only. Lexis+ with Protégé is their AI platform (rebranded Feb 2026). API access requires an enterprise relationship |
| **Pricing** | Enterprise — $500-1,500+/mo depending on tier. Implementation fees $10K-50K+ |
| **Our fit** | Too expensive, too slow to integrate. Sstieglitz explicitly said "Westlaw not Lexis" anyway |

---

#### Westlaw Jury Verdicts & Settlements
**The source Sstieglitz asked for, but the hardest to integrate.**

| | |
|---|---|
| **What it is** | Thomson Reuters' comprehensive legal research platform |
| **Verdict data** | Jury Verdicts and Settlements database — gold standard alongside VerdictSearch |
| **API** | **Westlaw Edge does NOT have a public API.** Thomson Reuters has a developer portal but it's for Legal Tracker (corporate legal ops), not Westlaw content. Enterprise content API requires a licensing agreement |
| **Pricing** | Westlaw Edge: $169-256/mo per user. Westlaw AI: $200-1,200+/mo. Enterprise licensing for data access: annual commitments, firm-wide minimums, implementation fees |
| **Our fit** | Maximum credibility (it's what Sstieglitz asked for), maximum cost and integration difficulty. No self-serve path. This is a 3-6 month enterprise sales cycle minimum |

---

### Tier 3: Free / Open Source

#### CourtListener (Free Law Project)
**Free, open, but no verdict dollar amounts.**

| | |
|---|---|
| **What it is** | Non-profit open legal data platform. 501(c)(3) |
| **Coverage** | Millions of opinions, tens of millions of PACER docket entries (RECAP Archive), oral arguments |
| **Verdict data** | **Case opinions only — not structured verdict/settlement dollar amounts.** You can find opinions that mention verdict amounts in the text, but there's no structured "this case resulted in a $X verdict" field |
| **API** | Yes — REST API v4.3. Well-documented. Free for non-commercial research, commercial use requires agreement |
| **Pricing** | Free (non-profit). Commercial licensing requires conversation with Free Law Project |
| **Our fit** | Good for enriching the AI assistant with cited case law. Not useful for the structured verdict-comparison feature Sstieglitz wants. Worth integrating as a "cite relevant case law" layer, but doesn't solve the valuation problem |

---

#### State Court Public Records
**Free, inconsistent, labor-intensive.**

| | |
|---|---|
| **What it is** | Individual state court websites that publish records |
| **Coverage** | Varies wildly. NY eCourts has good data. CA has searchable records. Most states are fragmented across county-level systems |
| **Verdict data** | Some states publish verdict information in searchable databases. NY is the best. Most are not structured for programmatic access |
| **API** | No. Screen-scraping required. Legally gray, technically fragile |
| **Our fit** | Too much work per state for too little structured data. Not a scalable path |

---

### Tier 4: Adjacent / Supplementary

#### Picture It Settled
**Settlement prediction, not verdict search.**

| | |
|---|---|
| **What it is** | Neural network-based settlement prediction tool |
| **What it does** | Predicts what an opponent will do in negotiations based on thousands of historical cases. Projects likely settlement timing and amount |
| **API** | No public API. Has a mobile app (Picture It Settled Lite) |
| **Our fit** | Complementary to our valuation, not a replacement for verdict citations. Could be interesting later as a "negotiation intelligence" layer |

---

## The Recommendation: A 3-Phase Strategy

### Phase 0 — What We Have Today (cost: $0)

**Claude AI-estimated verdict ranges.** Already built. Uses the 6 Sstieglitz parameters to generate a directional estimate. Labeled clearly as AI-estimated with a disclaimer.

**What it gives the attorney:** A range and reasoning. Not citable, but informed.

**What it doesn't give:** Case names, docket numbers, verified dollar amounts. The attorney can't put "Claude thinks it's worth $45K-$120K" in a demand letter.

**When to use this:** Right now, for every demo, while we work on Phase 1.

---

### Phase 1 — Trellis Integration (cost: ~$130-500/mo, timeline: 2-4 weeks)

**Why Trellis is the move:**

1. **They have an API.** It's built, documented, and in production (v2 since May 2024). We're not begging for access — we're integrating with a product they want people to use.

2. **State trial court focus.** PI cases live in state trial courts. Trellis has 2.5B records across 3,500 courts in 45+ states. That's where our data needs to be.

3. **Judge analytics is a differentiator.** Sstieglitz didn't ask for this, but "Judge Rodriguez grants defense MSJ 34% of the time in PI cases, median PI verdict in his courtroom is $68K" is information that changes litigation strategy. No other platform we evaluated structures this data for trial courts.

4. **They're building a partner ecosystem.** The Fisher Phillips partnership shows they're open to integrating their data into third-party platforms. We're a natural fit — we surface their data to solo/small-firm PI attorneys who might not buy Trellis directly.

5. **Pricing is startup-compatible.** Even if API pricing is $300-500/mo (worst case), that's 10% of the cost of Westlaw. And it's negotiable — especially if we position ourselves as a distribution channel for their data.

6. **Verdict coverage is growing.** CA and NY have the deepest verdict/settlement data. Other states have rulings and dockets. As Trellis expands verdict coverage, our integration gets better automatically.

**What to build:**
- Verdict search endpoint: query Trellis API with jurisdiction + case type + keywords → return comparable verdicts with case names, amounts, dates
- Judge analytics card: query Trellis for the assigned judge's stats → display on case valuation tab
- Similarity scoring: rank Trellis results by match to our 6 parameters (client-side ranking of API results)

**What it looks like in the product:**
```
┌─────────────────────────────────────────────────────┐
│ Comparable Verdicts                    via Trellis   │
├─────────────────────────────────────────────────────┤
│ 94% match  Garcia v. State Farm (2024)              │
│            Travis Co. TX — Auto, cervical herniation │
│            Female, 36 — Verdict: $72,000             │
│                                                     │
│ 87% match  Chen v. Progressive (2024)               │
│            Williamson Co. TX — Auto, disc herniation │
│            Male, 29 — Settlement: $91,000            │
│                                                     │
│ 71% match  Thompson v. GEICO (2023)                 │
│            Harris Co. TX — Auto, herniation          │
│            Female, 41 — Verdict: $115,000            │
├─────────────────────────────────────────────────────┤
│ Judge Intelligence                     via Trellis   │
│ Judge Maria Rodriguez, Travis County                 │
│ • Median PI verdict: $68,000                         │
│ • Grants defense MSJ: 34%                           │
│ • Average time to trial: 14 months                   │
│ • PI cases heard (2yr): 127                          │
└─────────────────────────────────────────────────────┘
```

**This is what justifies the $3K price point.** An attorney who's pricing a demand sees comparable verdicts with case names, amounts, jurisdictions, AND knows their judge's tendencies. That's worth $250/mo to a PI firm that bills $400/hr — it pays for itself with one case.

---

### Phase 2 — VerdictSearch Partnership (cost: ~$200-500/mo, timeline: 2-3 months)

**After Trellis is integrated and generating revenue,** approach ALM about VerdictSearch data licensing. VerdictSearch has:
- 210,000+ cases with attorney-verified outcome details
- 15 structured search criteria
- National coverage across all case types

The pitch to ALM: "We're already surfacing Trellis verdict data to PI attorneys. We want to add VerdictSearch as a premium data source for firms that need deeper coverage. We'll drive subscriptions to your platform."

This becomes a dual-source verdict search: Trellis for state trial court data + VerdictSearch for the attorney-verified outcome database.

---

### Phase 3 — Westlaw Content API (cost: $500-1000+/mo, timeline: 6+ months)

**Only pursue this if we have revenue justifying the cost.** Westlaw is the gold standard and what Sstieglitz explicitly asked for. But:
- No public API — requires an enterprise licensing agreement
- Pricing is enterprise-oriented ($500-1,500/mo minimum, possibly more)
- Integration timeline is 3-6 months from first contact to live data
- Implementation fees of $10K-50K are common

**When to pull this trigger:** When we have 20+ paying customers and the unit economics support a $500+/mo data cost. At $3K/firm/mo and 20 firms, that's $60K ARR — a $6K/yr Westlaw cost is 10% of revenue. Defensible.

---

## Cost Comparison Table

| Source | Monthly cost | Verdict data quality | API | Judge analytics | Integration effort | When to integrate |
|--------|-------------|---------------------|-----|----------------|-------------------|------------------|
| **Claude (current)** | $0 (API costs only) | AI-estimated, not citable | Built | No | Done | **Now** |
| **Trellis** | ~$130-500/mo | Real verdicts, growing coverage | Yes (v2) | **Yes** | 1-2 weeks | **Phase 1 (next)** |
| **CourtListener** | $0 | Opinions only, no verdict $ | Yes | No | 1 week | Parallel (for citation enrichment) |
| **VerdictSearch** | ~$200-500/mo | Gold standard, attorney-verified | No (need partnership) | No | 2-3 months | Phase 2 |
| **UniCourt** | Custom | Dockets, limited verdicts | Yes | No | 1-2 weeks | Later (for docket monitoring) |
| **Fastcase** | Free (bar) / custom (API) | Case law, no verdict $ | Limited | No | Unknown | Low priority |
| **Westlaw** | $500-1,500+/mo | Gold standard | Enterprise only | Limited | 3-6 months | Phase 3 (with revenue) |
| **LexisNexis** | $500-1,500+/mo | Comprehensive | Enterprise only | No | 3-6 months | Probably never (Sstieglitz said no) |

---

## The $3K Price Point Justification

Archish wants to present a high-end product that justifies $3K/firm/month. Here's what the data stack looks like at each phase and whether it supports that price:

### Phase 0 (now): Claude-only estimation
- **Justifiable price:** $50-100/mo. It's a smart calculator. Nice but not $3K-nice.

### Phase 1 (Trellis): Real verdicts + judge analytics
- **Justifiable price:** $500-1,000/mo. Now the attorney has real case citations AND knows their judge's patterns. Competitive with Trellis + case management + AI assistant bundled.

### Phase 2 (Trellis + VerdictSearch): Dual-source verdicts
- **Justifiable price:** $1,500-2,500/mo. Comprehensive verdict coverage from two independent sources. The attorney doesn't need their own Trellis OR VerdictSearch subscription — we surface the best of both.

### Phase 3 (Trellis + VerdictSearch + Westlaw): Full stack
- **Justifiable price:** $3,000+/mo. The attorney gets Westlaw-grade verdict data, Trellis judge analytics, VerdictSearch attorney-verified outcomes, AI-powered extraction, case management, and redaction — all in one product. They cancel their $1K/mo Westlaw subscription and their $200/mo case management tool. We're saving them money.

**The $3K price point becomes defensible when we bundle data that would cost the attorney $1,500-2,000/mo to buy separately** (Westlaw $500 + Trellis $200 + VerdictSearch $200 + case management $100-200 + AI tools $100). We're not charging $3K for software — we're charging $3K for a bundle that replaces $2K+ in separate subscriptions.

---

## Immediate Action Items

### This week

1. **Email Trellis sales/partnerships** — use the outreach template above. Ask about startup/partnership API pricing. Mention the Fisher Phillips partnership as a reference point for what we're proposing.

2. **Request a Trellis free trial** — test the verdict search manually. Verify that the data for TX PI cases is deep enough to produce 3-5 comparable verdicts for the Maria Garcia demo case.

3. **Integrate CourtListener** (free, 1 week) — the AI assistant can cite real case law from CourtListener's API when answering legal questions. Not verdict data, but real citations. Makes the chatbot more credible immediately.

### Next 2 weeks (after Trellis responds)

4. **Build Trellis API integration** — verdict search endpoint wired into the valuation tab. Judge analytics card. Similarity scoring.

5. **Demo the integrated product to Sstieglitz** — "Here are 5 comparable verdicts from Travis County for cervical herniation cases, plus your judge's ruling patterns."

### Month 2+

6. **Approach VerdictSearch (ALM)** — with Trellis integrated and working, we have a product to demo. The VerdictSearch pitch is: "we're already distributing verdict data to PI attorneys, add your data source to our platform."

7. **Revisit pricing** — with real data sources integrated, the pricing conversation with Archish changes from "what should we charge?" to "what does the data stack cost us, and what's the margin?"

---

## Sources

- [Trellis — AI-Powered State Court Research](https://trellis.law/)
- [Trellis Trial Court Data API](https://trellis.law/legal-data-api)
- [Trellis API Documentation](https://support.trellis.law/trellis-api)
- [Trellis Pricing Plans](https://trellis.law/plans)
- [Trellis Partners with Fisher Phillips — LawSites](https://www.lawnext.com/2025/05/trellis-partners-with-fisher-phillips-to-deliver-ai-powered-case-strategy-reports-through-automated-alerts.html)
- [Trellis — Crunchbase](https://www.crunchbase.com/organization/trellis-research)
- [UniCourt Enterprise API](https://unicourt.com/solutions/enterprise-api)
- [UniCourt Pricing](https://unicourt.com/pricing/)
- [VerdictSearch — ALM/Law.com](https://www.law.com/verdictsearch/)
- [CourtListener APIs](https://www.courtlistener.com/help/api/)
- [CourtListener Coverage](https://www.courtlistener.com/help/coverage/)
- [Fastcase Legal Data API](https://www.fastcase.com/solutions/legal-data-api/)
- [Westlaw Edge Pricing — GetApp](https://www.getapp.com/legal-law-software/a/westlaw-edge/)
- [Westlaw AI Review — Elephas](https://elephas.app/resources/westlaw-ai-review)
- [LexisNexis Verdict & Settlement Analyzer](https://www.lexisnexis.com/en-us/products/verdict-and-settlement-analyzer.page)
- [Picture It Settled](https://pictureitsettled.com/)
- [7 Best Westlaw Alternatives — TheLawGPT](https://www.thelawgpt.com/blog/westlaw-alternatives-affordable-legal-research)
