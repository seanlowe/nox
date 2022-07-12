import React, { useEffect, useState } from 'react'
import { Navigation, Pagination, Virtual } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { createMealWeek } from '../../../services/FreyrService'
import MealCardV3 from './MealCardV3'
import { Button } from '@mui/material'

const FreyrV3 = () => {
  const [ week, setWeek ] = useState( [] )
  const [ swiperRef, setSwiperRef ] = useState( 0 )
  const today = new Date().getDay()

  const setupWeekMeals = async () => {
    const meals = await createMealWeek()
    setWeek( meals )
  }

  useEffect(() => {
    setupWeekMeals()
  }, [] )

  return (
    <>
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
    </>
  )
}

export default FreyrV3
