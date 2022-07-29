## Prisma and Database Design Notes


use aurora

put your models in a modelName.prisma file in the prisma directory in extensions

aurora will run and look for models in `extensions/prisma` as well as `prisma/schema` and combine them all into one large `schema.prisma` file that will be used for the database
