import * as mealService from '../../services/api/mealService'

const store = async ( req, res ) => {
  const { body: { type, data, isNewWeek } } = req

  switch ( type ) {
  case 'week':
    return await mealService.storeWeekToFile( data, isNewWeek, res )
  default:
    console.log( 'post default case' )
    return res.status( 404 ).json({ message: 'Malformed Request' })
  }
}

export default async function handler( req, res ) {
  switch ( req.method ) {
  case 'POST':
    return store( req, res )
  default:
    console.error( 'get fucked' )
    break
  }
  res.end()
}
