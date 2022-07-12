import { PropTypes } from 'prop-types'
import { daysOfTheWeek } from '../../../services/FreyrService'

const MealCardV3 = ({ day: weekday }) => {
  const { day, lunch, dinner } = weekday
  const today = daysOfTheWeek[new Date().getDay()]
  const isToday = weekday.day === today

  return (
    <div className={`meal-card ${isToday ? 'today' : ''}`}>
      <h3 className='day-title'> {day} </h3>
      <div className='section-dinner'>
        <div className='dinner-name'> {dinner.name} </div>
        <sub> Dinner </sub>
      </div>
    </div>
  )
}

MealCardV3.propTypes = PropTypes.shape({
  day: PropTypes.shape({
    day: PropTypes.string,
    lunch: PropTypes.shape({}),
    dinner: PropTypes.shape({}),
  })
})

export default MealCardV3
