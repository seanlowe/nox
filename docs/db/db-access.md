## Database Access and Design Choices

Before the frontend and backend were separated, nox used [Prisma](https://github.com/prisma/) exclusively due to the convienent way it exposed tables as models to be used in a methodical way. When I separated the frontend and backend, I could no longer use Prisma on the backend because the [Prisma Golang Client](https://github.com/prisma/prisma-client-go) was deprecated which meant I had 2 options:
1. find a new ORM / DB management library.
2. completely redo my DB in something "golang".

Completely rebuilding my database schema and methodology wasn't favorable and so I decided to look for a library that made it easier to access the database and continue to use Prisma (paired with [Schemix](https://github.com/ridafkih/schemix)) as my ORM of choice.

I ended up choosing [upper/db](https://github.com/upper/db). 

Because I am still favoring Prisma/Schemix for database schema control, the first place to define a new model is still on the 'frontend' in the `/prisma` directory. 

When accessing the database from the backend, there will need to be a struct that matches the database model in the package's `<packageName>Model.go` file to hold database records in.
