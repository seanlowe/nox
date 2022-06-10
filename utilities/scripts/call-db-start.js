#! /usr/local/bin/node

require( 'dotenv' ).config()
const shell = require( 'shelljs' )

const server = process.env.DB_SERVER

if ( !server ) {
  console.error( 'Missing required value. Ensure the appropriate variables are set in .env' )
} else {
  shell.exec( `./utilities/scripts/start-db.sh ${server}` )
}
