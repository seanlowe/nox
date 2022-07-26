require( 'dotenv' ).config()
const shell = require( 'shelljs' )

const server = process.env.DB_SERVER

const checkContainerStatus = () => {
  const container = shell.exec(
    `docker container ls -a --format '{{.Names}} -- {{.Status}}' | grep ${server}` 
  ).trim()
  
  switch ( !!container ) {
  case true:
    const isRunning = container.includes( 'Up' )
    if ( isRunning ) {
      return 'running'
    }

    return 'exists'
  case false:
  default:
    return 'new'
  }
}

module.exports.checkContainerStatus = checkContainerStatus
