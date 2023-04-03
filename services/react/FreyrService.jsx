import axios from 'axios'
import backendApi from '../../utilities/instances/axios'
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
  const { data: dinners } = await backendApi.get( '/meal?type=dinner' )

  return dinners
}

const isViableEntry = ( meal ) => {
  const { lastMade } = meal
  const ago = new Date().setDate( new Date().getDate() - 14 )
  
  if ( !lastMade || lastMade > ago ) {
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
    }
  }

  return randomDinners
}

const storeCurrentWeek = async ( week, isNewWeek ) => {
  const body = {
    type: 'week',
    data: JSON.stringify( week ),
    isNewWeek
  }

  // await backendApi.post( '/meal', body )
  await axios.post( '/api/meal', body )

  return
}

const checkForWeek = async () => {
  const { data } = await backendApi.get( '/meal/week' )
  const dinners = convertCapitalizedObjectToLowercaseObject( data )

  return dinners
}

// return type: [ {day: Monday, lunch: {}, dinner: {}}, {day: Tuesday}, ... ]
const createMealWeek = async ( isNewWeek ) => {
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

  storeCurrentWeek( week, isNewWeek )
  return week
}

export const displayMealWeek = async ( isNewWeek = false ) => {
  if ( isNewWeek ) {
    return createMealWeek( true )
  }

  // check for current week and return if it exists
  const mealWeek = await checkForWeek()
  if ( mealWeek.length ) {
    return mealWeek
  }
  
  // else, create a new week
  return createMealWeek()
}
