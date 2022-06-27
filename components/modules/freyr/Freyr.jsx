import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, Grid, CircularProgress } from '@mui/material'
import { createMealWeek } from './FreyrActions'
import axios from 'axios'
import MealCard from './MealCard'

const Freyr = () => {
  const [ week, setWeek ] = useState( [] )

  const setupWeekMeals = async () => {
    const meals = await createMealWeek()
    setWeek( meals )
  }

  useEffect(() => {
    setupWeekMeals()
  }, [] )

  const handleClick = async () => {
    const item = {
      name: 'Fancy Ramen',
      type: 'dinner',
    }

    console.log( item )

    const res = await axios.post( 'api/meal', item )
    console.log( res )
  }

  const renderCards = () => {
    if ( week.length < 1 ) {
      return null 
    }

    return (
      <MealCard day={week[0].day} lunch={null} dinner={week[0].dinner} />
    )
  }

  return (
    <>
      {renderCards()}
    </>
  )
  // return (
  //   <Card variant='outlined' >
  //     <CardHeader title='Meals For The Week' />
  //     <CardContent>
  //       <Grid container columnSpacing={5}>
  //         <Grid item xs={6}>
  //           <div className='key-value-container'>
  //             <div className='labels'>
  //               {renderLunches()}
  //               {renderDinners()}
  //               <button onClick={handleClick}>
  // 								click me
  //               </button>
  //             </div>
  //           </div>
  //         </Grid>
  //       </Grid>
  //     </CardContent>
  //   </Card>
  // )
}

export default Freyr
