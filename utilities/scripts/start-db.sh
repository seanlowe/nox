#!/bin/bash

SERVER=$1

# if $SERVER exists, stop, remove and rebuild
CONTAINER=$(docker container ls -a --format '{{.Names}} -- {{.Status}}' | grep $SERVER)
if [[ ! -z $CONTAINER ]] ; then
  echo "Existing container found"
  IS_RUNNING=$(echo $CONTAINER | grep -i 'up')
  if [[ -z $IS_RUNNING ]] ; then
    echo "Starting $SERVER"
    docker container start $SERVER &> /dev/null
  fi
elif [[ -z $CONTAINER ]] ; then
  echo "No existing container found, please run: npm run db:new"
fi

echo "Waiting to make sure $SERVER is running before continuing"
SLEEP 1

if [[ ! -z $CONTAINER ]] ; then
  IS_RUNNING=$(echo $CONTAINER | grep -i 'up')
  if [[ -z $IS_RUNNING ]] ; then
    echo "$SERVER started successfully"
  fi
fi
