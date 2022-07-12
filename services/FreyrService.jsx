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

export const createMealWeek = async () => {
  // return type: [ {day: Monday, lunch: {}, dinner: {}}, {day: Tuesday}, ... ]
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

  return week
}
