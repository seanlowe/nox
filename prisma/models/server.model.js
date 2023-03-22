const { createModel } = require( 'schemix' )

createModel( 'Server', ( ServerModel ) => {
  ServerModel
    .int( 'id', { id: true, default: { autoincrement: true } })
    .string( 'name' )
    .string( 'ipv4' )
    .string( 'port' )
})
