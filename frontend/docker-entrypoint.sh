#!/bin/sh
set -eu

# Configure runtime API URL (Render env var).
API_URL="${API_URL:-http://localhost:5000}"

if [ -f /usr/share/nginx/html/env.js ]; then
  cat > /usr/share/nginx/html/env.js <<EOF
globalThis.__env = { API_URL: "${API_URL}" };
EOF
fi

exec nginx -g 'daemon off;'

