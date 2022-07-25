#! /usr/local/bin/node

require( 'dotenv' ).config()
const shell = require( 'shelljs' )

const server = process.env.DB_SERVER
const database = process.env.DB_NAME
const password = process.env.DB_PW
const user = process.env.DB_USER

if ( !server || !database || !password || !user ) {
  console.error( 'Missing required values. Please set the appropriate database variables in .env' )

  process.exit()
}

const container = shell.exec(
  `docker container ls -a --format '{{.Names}} -- {{.Status}}' | grep ${server}` 
).trim()

if ( container ) {
  console.log( 'Existing container found' )
  const isRunning = container.includes( 'Up' )
  if ( isRunning ) {
    console.log( `Stopping ${server}` )
    shell.exec( `docker container stop ${server} &> /dev/null` )
  }

  console.log( `Removing ${server}` )
  shell.exec( `docker container rm ${server} &> /dev/null` )
}

const buildContainer = 'docker run -d -p 5432:5432' + 
  ` -e POSTGRES_USER=${user} -e POSTGRES_PASSWORD=${password} --name ${server} postgres`
shell.exec( buildContainer )

console.log( `Waiting to make sure ${server} is running before continuing` )
shell.exec( 'sleep 2' )

const buildDatabase = `echo "CREATE DATABASE ${database} ENCODING 'UTF-8';"` +
 `| docker exec -i ${server} psql -U postgres`
shell.exec( buildDatabase )

const listDatabase = `echo "\\l" | docker exec -i ${server} psql -U postgres`
shell.exec( listDatabase )

process.exit()
