import backendApi from '../utilities/instances/axios'
import { convertCapitalizedObjectToLowercaseObject } from './helpers'

export const daysOfTheWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const records = []

const getDinners = async () => {
  const { data } = await backendApi.get( '/meal?type=dinner' )
  const dinners = convertCapitalizedObjectToLowercaseObject( data )

  return dinners
}

const isViableEntry = ( meal ) => {
  // lastMade is returned as an ISO String
  const { lastMade: lastMadeISO } = meal
  const lastMade = new Date( lastMadeISO ).getTime()
  const ago = new Date().setDate( new Date().getDate() - 14 )

  if ( !!lastMade || lastMade > ago ) {
    return true
  }

  return false
}

const getRandomDinners = async () => {
  const randomDinners = []

  if ( records.length === 0 ) {
    records = await getDinners()
  }

  while ( randomDinners.length !== 7 ) {
    const item = records[Math.floor( Math.random() * records.length )]
    if ( !randomDinners.includes( item ) && isViableEntry( item )) {
      randomDinners.push( item )

      // remove used records to reduce extra loops
      records.filter(( usedMeal ) => {
        return item !== usedMeal 
      })
    }
  }

  return randomDinners
}

const storeCurrentWeek = async ( week ) => {
  const body = {
    data: JSON.stringify( week ),
  }

  await backendApi.post( '/meal/week', body )

  return
}

const checkForWeek = async () => {
  const { data } = await backendApi.get( '/meal/week' )
  const dinners = convertCapitalizedObjectToLowercaseObject( data )

  return dinners
}

// return type: [ {day: Monday, lunch: {}, dinner: {}}, {day: Tuesday}, ... ]
const createMealWeek = async () => {
  const week = []
  const dinnersForTheWeek = await getRandomDinners()
  for ( let i = 0; i < daysOfTheWeek.length; i++ ) {
    const day = {
      day: daysOfTheWeek[i],
      lunch: {}, // leave empty for now. Only scheduling dinnertime
      dinner: dinnersForTheWeek[i],
    }
    week.push( day )
  }

  storeCurrentWeek( week )
  return week
}

export const displayMealWeek = async ( isNewWeek = false ) => {
  if ( isNewWeek ) {
    return createMealWeek()
  }

  // check for current week and return if it exists
  const mealWeek = await checkForWeek()
  if ( mealWeek.length ) {
    return mealWeek
  }
  
  // else, create a new week
  return createMealWeek()
}
