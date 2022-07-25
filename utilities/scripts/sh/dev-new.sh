#!/bin/bash

# creates new database
npm run db:new

# runs any database migrations and automatically runs the seeder
npm run db:migrate

# generates the prisma client for us in nox
npm run db:generate

# starts the Next.js dev server
next dev