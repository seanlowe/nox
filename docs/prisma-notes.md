## Prisma and Database Design Notes

This project uses [prisma-aurora](https://github.com/sabinadams/aurora) to combine individual Prisma models into one large schema.prisma file so as to increase maintainability, extensibility, and readability.

_nox_ uses Prisma to codify the database with models. All necessary models will live in the `prisma/schema` folder.

When Aurora runs on application start, it will look for models in 2 places:
- `extensions/prisma`, and 
- `prisma/schema` 

and combine them all into one large `schema.prisma` file that will be used for managing the database.

### Prisma Model Structure
---

```prisma
model Example {
  id       Int @id @default(autoincrement())
  title    String
  written  DateTime
}
```
More examples can be found on Prisma's [website](https://www.prisma.io/).

### Extensions
---
If your extension requires a change to one of the base Prisma models or an entirely new model, put your models in a `modelName.prisma` file in the `extensions/prisma` directory.

<br />
