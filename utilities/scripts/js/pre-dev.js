#! /usr/local/bin/node

const shell = require( 'shelljs' )
const { checkContainerStatus } = require( './helpers' )

const status = checkContainerStatus()

switch ( status ) {
case 'running':
case 'exists':
  shell.exec( './utilities/scripts/sh/dev-existing.sh' )
  break
case 'new':
  shell.exec( './utilities/scripts/sh/dev-new.sh' )
default:
  break
}
