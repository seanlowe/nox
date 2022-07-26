#! /usr/local/bin/node

require( 'dotenv' ).config()
const shell = require( 'shelljs' )

const server = process.env.DB_SERVER
if ( !server ) {
  console.error( 'Missing required value. Ensure the appropriate variables are set in .env' )

  process.exit()
}

const status = checkContainerStatus()
switch ( status ) {
case 'new':
  console.error( 'No existing container found, please run: `npm run db:new`' )

  process.exit()
case 'running':
  console.log( 'Database container already running' )

  process.exit()
case 'exists':
  console.log( 'Existing container found' )
default:
  console.log( `Starting ${server}` )
  const started = shell.exec( `docker container start ${server} &> /dev/null` ).code
  if ( started === 0 ) {
    console.log( `${server} started successfully` )
  }

  process.exit()
}
