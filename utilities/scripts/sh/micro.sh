#!/bin/bash

INDEX_PATH='../../../api/index.js'
PORT=3099

# start micro backend server at localhost:3099
npx micro-dev -p ${PORT} ${INDEX_PATH}
