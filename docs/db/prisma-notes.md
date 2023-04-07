## Prisma and Database Design Notes

_nox_ uses Prisma to codify the database with models. Because there's no built-in way (from Prisma) to split models across multiple files, this project utilizes a library called [schemix](https://github.com/ridafkih/schemix) to combine individual Prisma models into one large schema.prisma file so as to increase maintainability, extensibility, and readability.

All necessary models will live in the `prisma/models` folder. These models are written in JavaScript and can be built programmatically using schemix's implementation of `mixins` and `enums`. This allows you to write fragments that can be reused across multiple models (such as default 'created_by' and 'updated_at' fields). 

In order from schemix to generate the final `schema.prisma` file, there is a package.json script to use as such:
```bash
$ npm run db:mix
```

This will combine all the various models into their final forms and output a singular schema.prisma file in the `prisma/` directory.

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

<!-- ### Extensions
---
If your extension requires a change to one of the base Prisma models or an entirely new model, put your models in a `modelName.prisma` file in the `extensions/prisma` directory. -->
