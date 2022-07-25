require( 'dotenv' ).config()
const shell = require( 'shelljs' )

const server = process.env.DB_SERVER
const dir = './utilities/scripts/js'

const container = shell.exec(
  `docker container ls -a --format '{{.Names}} -- {{.Status}}' | grep ${server}` 
).trim()

switch ( !!container ) {
case true:
  shell.exec( `node ${dir}/start-db.js` )
  
  break
case false:
default:
  shell.exec( `node ${dir}/setup-new-db.js` )

  break
}
