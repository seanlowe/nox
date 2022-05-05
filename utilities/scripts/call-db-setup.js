#! /usr/local/bin/node

require( 'dotenv' ).config()
const shell = require( 'shelljs' )

const server = process.env.SERVER
const database = process.env.DB
const password = process.env.PW
const user = process.env.USER

if ( !server || !database || !password || !user ) {
	console.error( 'Missing required values. Please set the appropriate database variables in .env' )
} else {
	shell.exec(`./utilities/scripts/setup-db.sh ${server} ${database} ${password} ${user}`)
}
