import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

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
  const renderLunch = () => {
    // <p> Lunch: </p>
    // <br />
    return null
  }

  const renderDinner = () => {
    const dinner = '' // make API call to get random Meal from DB
    return (
      <p> Dinner: {} </p>
    )
  }

  return (
    <Card>
      <CardHeader>{new DateTime.today()}</CardHeader>
      <CardContent>
        <Grid container columnSpacing={5}>
          <Grid item xs={6}>
            <div className='key-value-container'>
              <div className='labels'>
                {renderLunch()}
                {renderDinner()}
              </div>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
