# Tabula LiteLLM proxy image for Render / Railway / Fly deployment.
#
# Why we wrap the official image instead of using it directly:
#   - Render's Docker runtime expects a Dockerfile at a path it can build
#   - We need to bake in our config.yaml so the container is self-contained
#   - We bind to the $PORT Render injects at runtime
FROM ghcr.io/berriai/litellm:main-stable

WORKDIR /app

# Copy the proxy config (model list, guardrails, callbacks) into the image.
COPY config.yaml /app/config.yaml

# Render (and most PaaS) inject a $PORT env var at runtime. Default to
# 4000 for local docker runs so nothing breaks if PORT is unset.
ENV PORT=4000
EXPOSE 4000

# The base image has ENTRYPOINT ["litellm"], which means anything we put
# in CMD gets appended as args. Reset the entrypoint so we can spawn our
# own shell (for $PORT expansion) and run litellm cleanly.
ENTRYPOINT []
# Dropped --num_workers 2 — LiteLLM's worker implementation spawns
# duplicate uvicorn instances that fight over the same port on Railway.
# For Railway's 1GB memory cap, a single process is enough.
CMD ["sh", "-c", "litellm --config /app/config.yaml --port ${PORT:-4000}"]
