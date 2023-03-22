const { createSchema } = require( 'schemix' )

// init schemix
createSchema({
  basePath: __dirname,
  generator: [
    {
      name: 'client',
      provider: 'prisma-client-js'
    }
  ],
  datasource: {
    provider: 'postgresql',
    url: { env: 'DATABASE_URL' }
  },
}).export( __dirname, 'schema' )
