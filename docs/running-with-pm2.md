## Running with PM2 **(optional)**


### Instance Management
---
To run nox with a local (*important*: not global) installation of PM2:
```bash
$ npm run eco:up
# this runs `npx pm2 start ecosystem.config.js`
# which automatically starts the server in dev mode

# to stop the instance
$ npm run eco:down
```

**Notes:**
- Running `eco:down` also deletes the application instance so that multiple PM2 instances are not floating around.
- Even though the PM2 instance is deleted during `eco:down`, the docker container for the database will remain. In order to have a completely fresh start, you will need to stop and delete the docker container for the database. If you don't know how to do that, check out Docker's [docs](https://docs.docker.com/engine/reference/commandline/cli/).

### Changes to Configuration
---
Whenever changes are made to the `ecosystem.config.js` file, remember to run
```bash
$ npm run eco:rebuild
# this runs `npm run eco:down && npm run eco:up`
```
This will stop and remove the PM2 instance of the application, and then restart it with the updated file.

**Note:** If changing the 'name' value of the application, one must remember to change the `eco:down` command in [package.json](/package.json) with the correct name so that it deletes the application instance properly.

<br />

**Note:** this is outdated. I will update this soon with up-to-date instructions on running PM2 with the separate Next.js frontend and Golang backend.
