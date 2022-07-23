<center>
  <a href="https://github.com/nodejs" target="blank">
    <img src="https://nodejs.org/static/images/logo-light.svg" width="150" alt="Node.js Logo" />
  </a>

  <!-- next js -->
  <a href="https://github.com/vercel/next.js" target="blank">
    <svg style="transform: translateX(4%); shape-rendering: auto;" version="1.1" viewBox="0 0 148 90" width="150" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M34.992 23.495h27.855v2.219H37.546v16.699h23.792v2.219H37.546v18.334h25.591v2.219H34.992v-41.69zm30.35 0h2.96l13.115 18.334 13.405-18.334L113.055.207 83.1 43.756l15.436 21.429H95.46L81.417 45.683 67.316 65.185h-3.018L79.85 43.756 65.343 23.495zm34.297 2.219v-2.219h31.742v2.219h-14.623v39.47h-2.554v-39.47H99.64zM.145 23.495h3.192l44.011 66.003L29.16 65.185 2.814 26.648l-.116 38.537H.145v-41.69zm130.98 38.801c-.523 0-.914-.405-.914-.928 0-.524.391-.929.913-.929.528 0 .913.405.913.929 0 .523-.385.928-.913.928zm2.508-2.443H135c.019.742.56 1.24 1.354 1.24.888 0 1.391-.535 1.391-1.539v-6.356h1.391v6.362c0 1.808-1.043 2.849-2.77 2.849-1.62 0-2.732-1.01-2.732-2.556zm7.322-.08h1.379c.118.853.95 1.395 2.149 1.395 1.117 0 1.937-.58 1.937-1.377 0-.685-.521-1.097-1.708-1.377l-1.155-.28c-1.62-.38-2.36-1.166-2.36-2.487 0-1.602 1.304-2.668 3.26-2.668 1.82 0 3.15 1.066 3.23 2.58h-1.354c-.13-.828-.85-1.346-1.894-1.346-1.1 0-1.832.53-1.832 1.34 0 .642.472 1.01 1.64 1.284l.987.243c1.838.43 2.596 1.178 2.596 2.53 0 1.72-1.33 2.799-3.453 2.799-1.987 0-3.323-1.029-3.422-2.637z" fill="#fff" fill-rule="nonzero"></path></svg>
  </a>

  <!-- postgres - image currently broken -->
  <!-- <a href="https://github.com/postgres" target="blank">
    <img src="assets/elephant.png" height="135" width="135" alt="PostgreSQL Logo" />
  </a> -->

  <!-- prisma -->
  <a href="https://github.com/prisma/" target="blank">
    <img src="https://images2.prisma.io/footer-logo.png" alt="Prisma Logo" width="180" >
  </a>

  <!-- PM2 -->
  <a href="https://pm2.keymetrics.io/" target="blank">
    <img alt="PM2 logo" src="https://pm2.keymetrics.io/assets/pm2-logo-1.png" width="206">
  </a>
</center>

<br />
<hr />
<br />


# Nox
My attempt at a low-level version of JARVIS. Just something to tinker on in my free time using tools I find online, languages I had an idea in or something I wanted to learn better.

To serve the site, for the *first* time, locally, run:
```bash
$ npm run dev:new
# this runs several commands:
# - db:new, which creates a new database
# - db:migrate, which runs any database migrations and automatically runs the seeder
# - db:generate, which generates the Prisma Client for use in nox
# - next dev, which starts the Next.js dev server
```

It will be served at `localhost:3000/`

To run it any time afterwards, run:
```bash
$ npm run dev
# this will:
# - start the existing database
# - make sure the database is up to date,
# - then start the Next.js dev server
```

<br />

### Running with PM2
To run nox with a local (*important*: not global) installation of PM2:
```bash
$ npm run eco:up
# this runs `npx pm2 start ecosystem.config.js`
# which automatically starts the server in dev mode

# for production, you can restart and specify to start in production mode
$ npm run eco:restart:prod
# this runs `npx pm2 restart ecosystem.config.js --env prod`

# to stop the instance
$ npm run eco:down
# NOTE: this also deletes the application instance so that multiple instances are not floating around.
```

Whenever changes are made to the `ecosystem.config.js` file, remember to run
```bash
$ npm run eco:rebuild
# this runs `npm run eco:down && npm run eco:up`
```
This will stop and remove the PM2 instance of the application, and then restart it with the updated file.
Note: If changing the 'name' value of the application, one must remember to change the `eco:down` command in [package.json](/package.json) with the correct name so that it deletes the application instance properly.

<br />

## Prisma

This project uses Prisma to control database structure. After making any change to the [schema.prisma](/prisma/schema.prisma) file, run:
```bash
$ npm run db:migrate
$ npm run db:generate
```
This updates the database with changes you've made to the schema, then generates a new Prisma Client for use in the project.

To view your DB in the browser, run:
```bash
$ npm run db:view
```
It will open at `localhost:5555/`

<br />

## Deprecated Versions
I had many different modules built out in JS/TS but none of them were connected in a way that's feasible for consistent use. As of right now, I'm keeping around a few of the ones which were a little more built out in case I need to reference them again later.

<br />
<hr />
<br />

Built on [Next.js](https://nextjs.org/) with [Prisma](https://www.prisma.io/). Runtime management via [PM2](https://pm2.keymetrics.io/).
