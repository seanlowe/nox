import shell from 'shelljs'
import { db } from '../../utilities/scripts/js/check-db-connection'

const FREYR_STORAGE_PATH = './storage/freyr'

const checkWeekFileExists = () => {
  return shell.test( '-e', `${FREYR_STORAGE_PATH}/week.json` )
}

export const storeWeekToFile = ( data, isNewWeek, res ) => {
  // check if file exists, and if not, then create file and write
  // current week's meal schedule to it
  const weekExists = checkWeekFileExists()
  if ( !weekExists ) {
    shell.touch( `${FREYR_STORAGE_PATH}/week.json` )
    shell.echo( data ).to( `${FREYR_STORAGE_PATH}/week.json` )
  }

  if ( isNewWeek ) {
    // allow overwriting the week file with the new week
    shell.echo( data ).to( `${FREYR_STORAGE_PATH}/week.json` )
  }

  return res.status( 201 ).json({ message: 'success' })
}

export const createNewMeal = async ( data, res ) => {
  const {
    name,
    type,
  } = data

  const newMeal = {
    name,
    type,
    lastMade: null,
  }

  const meal = await db.meal.create({
    data: newMeal,
  })
  
  return res.status( 201 ).json( meal )
}

export const getWeek = ( res ) => {
  const weekExists = checkWeekFileExists()
  if ( !weekExists ) {
    return res.status( 200 ).json( [] )
  }

  const json = shell.cat( `${FREYR_STORAGE_PATH}/week.json` )
  const data = JSON.parse( json )

  return res.status( 200 ).json({ ...data })
}

export const getMeals = async ( query, res ) => {
  const meals = await db.meal.findMany({
    where: {
      ...query
    },
  })

  return res.status( 200 ).json({ meals })
}
