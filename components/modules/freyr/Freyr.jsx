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

  return (
    <>
      {!week && <CircularProgress />}
      {week && (
        <div className='meal-container'>
          {week.map(( weekday ) => {
            return (
              <MealCard day={weekday.day} lunch={null} dinner={weekday.dinner} />
            )
          })}
        </div>
      )}
    </>
  )
}

export default Freyr
