import Weather from '../modules/anemoi/Weather'
import WikiSearch from '../modules/WikiSearch'
import { createMealWeek } from '../../services/FreyrService'
import MealCard from '../modules/freyr/MealCard'

export const ImageSlides = [
  {
    item: '/images/bay.avif',
  },
  {
    item: '/images/bridge.avif',
  },
  {
    item: '/images/car.avif',
  },
  {
    item: '/images/mountain.avif',
  },
  {
    item: '/images/pyramid.avif',
  },
]

export const WorkerSlides = [
  {
    item: <Weather />,
  },
  {
    item: <WikiSearch />,
  },
]

export const MealSlides = async () => {
  const meals = await createMealWeek()

  return meals.map(( weekday ) => {
    return {
      item: <MealCard day={weekday.day} lunch={null} dinner={weekday.dinner} />
    }
  })
}
