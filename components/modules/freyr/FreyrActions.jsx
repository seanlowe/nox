import axios from 'axios'

const daysOfTheWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const getRandomDinner = async () => {
  const { data: { meals: dinners } } = await axios.get( '/api/meal?type=Dinner' )

  const item = dinners[Math.floor( Math.random() * dinners.length )]
  return item
}

export const createMealWeek = async () => {
  // return type: [ {day: Monday, lunch: {}, dinner: {}}, {day: Tuesday}, ... ]
  const week = []

  for ( let i = 0; i < 7; i++ ) {
    const day = {
      day: daysOfTheWeek[i],
      lunch: {}, // leave empty for now. Only scheduling dinnertime
      dinner: await getRandomDinner(),
    }
    week.push( day )
  }

  return week
}
