const { PrismaClient } = require( '@prisma/client' )

let db

if ( process.env.NODE_ENV === 'production' ) {
  db = new PrismaClient()
} else {
  // check if there is already a connection to the database
  if ( !global.db ) {
    global.db = new PrismaClient()
  }
  db = global.db
}

module.exports.db = db
