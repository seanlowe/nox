import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import axios from 'axios'

// create little cards with the Day, time and meals on them
//  ________________________
// /          MONDAY        \
// |                        |
// | Lunch:     <>          |
// | Dinner:    <>          |
// |                        |
// \                        /
//  ------------------------

const Freyr = () => {
  const renderLunchs = () => {
    // <p> Lunch: </p>
    // <br />
    return null
  }

  const renderDinners = () => {
    const dinner = '' // make API call to get random Meal from DB
    return (
      <p> Dinner: {} </p>
    )
  }

  const handleClick = async () => {
    const item = {
      name: 'Fancy Ramen',
      type: 'dinner',
    }

    console.log( item )

    const res = await axios.post( 'api/meal', item )
    console.log( res )
  }

  const today = new Date().toLocaleString( 'en-us', {  weekday: 'long' })
  console.log( today )

  return (
    <Card variant='outlined' >
      <CardHeader title='Meals For The Week' />
      <CardContent>
        <Grid container columnSpacing={5}>
          <Grid item xs={6}>
            <div className='key-value-container'>
              <div className='labels'>
                {renderLunchs()}
                {renderDinners()}
                <button onClick={handleClick}>
									click me
                </button>
              </div>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Freyr
