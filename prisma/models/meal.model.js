const { createModel } = require( 'schemix' )

createModel( 'Meal', ( MealModel ) => {
  MealModel
    .int( 'id', { id: true, default: { autoincrement: true } })
    .string( 'name' )
    .string( 'type' )
    .dateTime( 'lastMade', { optional: true })
})
