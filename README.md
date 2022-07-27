
<center style="font-size: 40px; font-weight:bold; letter-spacing: 1.25rem;">
  NOX
</center>

<hr />

<img align="right" alt="NOX Logo" src="public/images/nox.png" width="500" />
<div>
  My attempt at a low-level version of JARVIS.
  
  <br />
  Mostly something to tinker on in my free time using tools I find online, or languages I had an idea in or something I wanted to learn better.

  <br />
  The end goal is to have a singular headless application with a separate web app UI that can control smart home devices, handle geolocation, schedule events, manage choosing a meal schedule for the week and anything else that strikes my fancy.
</div>

<br />

## Installation
To install:
```bash
$ git clone https://github.com/seanlowe/nox.git
$ cd nox
$ npm install
```

## Setup
After installation has finished, you'll want to create your `.env` file. I have included an `.env.example` with default values that you can change to your liking.

## Running nox
To run nox (in dev mode) once you've set it up to your liking, run:
```bash
$ npm run dev
# this will:
# - check to see if a new database needs creating or if we can start an existing one
# - make sure the database is up to date by running any migrations and seeders necessary
# - then start the Next.js dev server
```

It will be served at `localhost:3000/`

<br />

### Running with PM2 **(optional)**
To run nox with a local (*important*: not global) installation of PM2:
```bash
$ npm run eco:up
# this runs `npx pm2 start ecosystem.config.js`
# which automatically starts the server in dev mode

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


<br />


<div style="display: flex; justify-content: space-evenly; align-items: center; flex-wrap: wrap;">
  <!-- nodeJS  -->
  <a href="https://github.com/nodejs" target="blank">
    <img alt="Node.js Logo" src="public/images/node.svg" width="200" />
  </a>

  <!-- next.js -->
  <a href="https://github.com/vercel/next.js" target="blank">
    <img alt="Next.js Logo" src="public/images/next.png" width="100" >
  </a>

  <!-- postgres -->
  <a href="https://github.com/postgres" target="blank">
    <img alt="PostgreSQL Logo" src="public/images/postgres.png" width="100" >
  </a>

  <!-- prisma -->
  <a href="https://github.com/prisma/" target="blank">
    <img alt="Prisma Logo" src="https://images2.prisma.io/footer-logo.png" width="200" >
  </a>

  <!-- pm2 -->
  <a href="https://pm2.keymetrics.io/" target="blank">
    <img alt="PM2 logo" src="public/images/pm2.png" width="200">
  </a>
</div>