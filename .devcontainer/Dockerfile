FROM node:24.19.0-bookworm-slim
ARG CLAUDE_VERSION=2.1.310
ARG LAB_REVISION=2026-10-28.2
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 git curl ca-certificates ripgrep less \
    python3-pip python3-venv python-is-python3 \
    && rm -rf /var/lib/apt/lists/*
RUN printf '%s\n' "${LAB_REVISION}" > /etc/imagi-workshop
COPY --chmod=755 .devcontainer/verify-tools.sh /usr/local/bin/workshop-verify
WORKDIR /opt/course
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund \
    && chown -R node:node /opt/course \
    && mkdir -p /workspaces/bienestar/node_modules /home/node/.claude \
    && chown -R node:node /workspaces /home/node/.claude
USER node
ENV PATH="/home/node/.local/bin:${PATH}"
ENV CLAUDE_CONFIG_DIR=/home/node/.claude
RUN curl -fsSL https://claude.ai/install.sh -o /tmp/install-claude.sh \
    && bash /tmp/install-claude.sh "${CLAUDE_VERSION}" \
    && /home/node/.local/bin/claude --version \
    && rm /tmp/install-claude.sh
USER root
RUN ln -s /home/node/.local/bin/claude /usr/local/bin/claude
USER node
RUN workshop-verify
WORKDIR /workspaces/bienestar
CMD ["sleep", "infinity"]
