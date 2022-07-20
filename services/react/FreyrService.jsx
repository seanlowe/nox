import axios from 'axios'

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
  const { data: { meals: dinners } } = await axios.get( '/api/meal?type=Dinner' )

  return dinners
}

const getRandomDinners = async () => {
  const randomDinners = []

  if ( records.length === 0 ) {
    records = await getDinners()
  }

  while ( randomDinners.length !== 7 ) {
    const item = records[Math.floor( Math.random() * records.length )]
    if ( !randomDinners.includes( item )) {
      randomDinners.push( item )
    }
  }

  return randomDinners
}

const storeCurrentWeek = async ( week ) => {
  const body = {
    type: 'week',
    data: JSON.stringify( week )
  }

  await axios.post( '/api/meal', body )

  return
}

const checkForWeek = async () => {
  return await axios.get( '/api/meal?type=week' )
}

// return type: [ {day: Monday, lunch: {}, dinner: {}}, {day: Tuesday}, ... ]
export const displayMealWeek = async () => {  
  // check for current week and return if it exists
  const { data } = await checkForWeek()
  const week = Object.values( data )

  if ( week.length ) {
    return week
  }
  
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
