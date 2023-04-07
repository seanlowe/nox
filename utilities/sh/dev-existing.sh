#!/bin/bash

# starts existing database
npm run db:start

# makes sure the database matches the latest schema
npx prisma db push
