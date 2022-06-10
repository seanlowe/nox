#! /usr/local/bin/node

require( 'dotenv' ).config()
const shell = require( 'shelljs' )

const server = process.env.DB_SERVER
const database = process.env.DB_NAME
const password = process.env.DB_PW
const user = process.env.DB_USER

if ( !server || !database || !password || !user ) {
  console.error( 'Missing required values. Please set the appropriate database variables in .env' )
} else {
  shell.exec( `./utilities/scripts/setup-db.sh ${server} ${database} ${password} ${user}` )
}
