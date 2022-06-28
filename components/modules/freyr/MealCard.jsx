import { PropTypes } from 'prop-types'
import { Card, CardContent, CardHeader } from '@mui/material'

const MealCard = ({ day, lunch, dinner }) => {
  return (
    <Card variant='outlined' className='meal-card'>
      <CardHeader title={day} className='day-title'/>
      <CardContent>
        <div className='section-dinner'>
          <div className='dinner-name'> {dinner.name} </div>
          <sub> Dinner </sub>
        </div>
      </CardContent>
    </Card>
  )
}

MealCard.propTypes = PropTypes.shape({
  day: PropTypes.string,
  lunch: PropTypes.shape({}),
  dinner: PropTypes.shape({}),
})

export default MealCard
