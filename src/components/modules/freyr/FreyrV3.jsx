import React, { Suspense, useEffect, useState } from 'react'
import { Navigation, Pagination, Virtual } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Button, Card } from '@mui/material'
import MealCardV3 from './MealCardV3'
import LoadingSpinner from '../../layouts/LoadingSpinner'
import { displayMealWeek } from '../../../services/FreyrService'

const FreyrV3 = () => {
  const [ week, setWeek ] = useState( [ {},{},{},{},{},{},{} ] )
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
    <>
      {/* {!week && <LoadingSpinner />} */}
      <Suspense fallback={LoadingSpinner}>
        {/* Your component code here */}
        {week && (
          <Card variant='outlined' className='card'>
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
                {week.map(( weekday, index ) => {
                  return (
                    <SwiperSlide key={`${weekday.day}-${index}`} >
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
          </Card>
        )}
      </Suspense>
    </>
  )
}

export default FreyrV3
