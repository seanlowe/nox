#!/bin/bash

# creates new database
npm run db:new

# generate the latest schema.prisma file
npm run db:mix

# runs any database migrations and automatically runs the seeder
npm run db:migrate

# run the seeder
npm run db:seed

# generates the prisma client for us in nox
npm run db:generate
