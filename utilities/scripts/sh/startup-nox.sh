#!/bin/bash

# see dev-new.sh for documentation
npm run dev:check

# starts the app on PM2
npx pm2 start ecosystem.config.js