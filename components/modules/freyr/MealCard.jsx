import { PropTypes } from 'prop-types'
import { Card, CardContent, CardHeader, Grid } from '@mui/material'

const MealCard = ({ day, lunch, dinner }) => {
  return (
    <Card variant='outlined' >
      <CardHeader title={day} />
      <CardContent>
        <Grid container columnSpacing={5}>
          <Grid item xs={6}>
            <div className='key-value-container'>
              <div className='labels'>
                {/* <div className='section-lunch'>
                  <p> {lunch.name} </p>
                  <p> Lunch </p>
                </div> */}
                <div className='section-dinner'>
                  <h4> {dinner.name} </h4>
                  <p> Dinner </p>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
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
