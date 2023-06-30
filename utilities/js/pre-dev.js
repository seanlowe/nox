#! /usr/local/bin/node

const shell = require( 'shelljs' )
const { checkContainerStatus } = require( './helpers' )

const status = checkContainerStatus()

console.log( 'container status?', status )

switch ( status ) {
case 'running':
case 'exists':
  shell.exec( './utilities/sh/dev-existing.sh' )
  break
case 'new':
  shell.exec( './utilities/sh/dev-new.sh' )
default:
  break
}
