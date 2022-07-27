## Running with PM2 **(optional)**
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
