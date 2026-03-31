#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="/home/robson_chitto/vittore-site"
PUBLIC_ROOT="/var/www/vittorepdr"
BRANCH="${1:-main}"

echo "Deploying Vittore site from ${REPO_DIR} to ${PUBLIC_ROOT}"

cd "${REPO_DIR}"

echo "Pulling latest changes from origin/${BRANCH}..."
git pull origin "${BRANCH}"

echo "Syncing site files to public root..."
rsync -av --delete --exclude ".git" --exclude "presentations" ./ "${PUBLIC_ROOT}/"

echo "Vittore site deploy completed."
