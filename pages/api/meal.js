import * as mealService from '../../services/api/mealService'

const get = async ( req, res ) => {
  const { query } = req

  switch ( query.type ) {
  case 'week':
    return mealService.getWeek( res )
  case 'Dinner':
    return await mealService.getMeals( query, res )
  default:
    console.log( 'get default case' )
    return res.status( 404 ).json({ message: 'Malformed Request' })
  }
}

const store = async ( req, res ) => {
  const { body: { type, data } } = req

  switch ( type ) {
  case 'week':
    return await mealService.storeWeekToFile( data, res )
  case 'meal':
    return await mealService.createNewMeal( data, res )
  default:
    console.log( 'post default case' )
    return res.status( 404 ).json({ message: 'Malformed Request' })
  }
}

export default async function handler( req, res ) {
  switch ( req.method ) {
  case 'POST':
    return store( req, res )
  case 'GET':
    return get( req, res )
  default:
    console.error( 'get fucked' )
    break
  }
  res.end()
}
