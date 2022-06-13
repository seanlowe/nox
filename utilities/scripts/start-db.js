#! /usr/local/bin/node

require( 'dotenv' ).config()
const shell = require( 'shelljs' )

const server = process.env.DB_SERVER

if ( !server ) {
  console.error( 'Missing required value. Ensure the appropriate variables are set in .env' )

  process.exit()
}

const container = shell.exec(
  `docker container ls -a --format '{{.Names}} -- {{.Status}}' | grep ${server}` 
).trim()

if ( container ) {
  console.log( 'Existing container found' )
  const isRunning = container.includes( 'Up' )
  if ( !isRunning ) {
    console.log( `Starting ${server}` )
    const started = shell.exec( `docker container start ${server} &> /dev/null` ).code
    if ( started === 0 ) {
      console.log( `${server} started successfully` )
      process.exit()
    }
  }
} else if ( !container ) {
  console.error( 'No existing container found, please run: `npm run db:new`' )
}
