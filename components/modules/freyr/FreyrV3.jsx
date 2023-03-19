import React, { useEffect, useState } from 'react'
import { Navigation, Pagination, Virtual } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { displayMealWeek } from '../../../services/react/FreyrService'
import MealCardV3 from './MealCardV3'
import { Button, Card } from '@mui/material'

const FreyrV3 = () => {
  const [ week, setWeek ] = useState( [] )
  const [ swiperRef, setSwiperRef ] = useState( 0 )
  const [ today, setToday ] = useState( 0 )

  const setupWeekMeals = async () => {
    const meals = await displayMealWeek()
    setWeek( meals )
  }

  useEffect(() => {
    setToday( new Date().getDay())
    setupWeekMeals()
  }, [] )

  return (
    <Card variant='outlined' className='card'>
      {!week && <CircularProgress />}
      {week && (
        <div className='freyr'>
          <Swiper
            onSwiper={setSwiperRef}
            slidesPerView={1}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[ Pagination, Navigation, Virtual ]}
            virtual
          >
            {week.map(( weekday ) => {
              return (
                <SwiperSlide key={weekday.day} >
                  <MealCardV3 day={weekday} />
                </SwiperSlide>
              )
            })}
          </Swiper>
          <Button
            variant='outlined'
            className='find-today'
            onClick={() => {
              swiperRef.slideTo( today )
            }}
          >
            Today
          </Button>
        </div>
      )}
    </Card>
  )
}

export default FreyrV3
