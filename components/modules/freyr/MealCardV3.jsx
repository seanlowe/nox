import { PropTypes } from 'prop-types'
import { daysOfTheWeek } from '../../../services/react/FreyrService'

const MealCardV3 = ({ day: weekday }) => {
  const { day, lunch, dinner } = weekday
  const today = daysOfTheWeek[new Date().getDay()]
  const isToday = weekday.day === today

  return (
    <div className={`card card-meal ${isToday ? 'today' : ''}`}>
      <h3 className='day-title'> {day} </h3>
      <div className='section-dinner'>
        <div className='dinner-name'> {dinner.name} </div>
        <sub> Dinner </sub>
      </div>
    </div>
  )
}

const mealType = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  type: PropTypes.string,
})

MealCardV3.propTypes = {
  day: PropTypes.shape({
    day: PropTypes.string,
    lunch: mealType,
    dinner: mealType,
  })
}

export default MealCardV3
