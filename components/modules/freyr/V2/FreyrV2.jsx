import React, { useEffect, useRef, useState } from 'react'
import SwiperCore, { EffectCards, Virtual, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { createMealWeek } from '../../../../services/FreyrService'
import MealCard from '../MealCard'

// SwiperCore.use( [ Virtual, Navigation, Pagination ] )

const FreyrV2 = () => {
  const [ week, setWeek ] = useState( [] )
  // const [ swiperRef, setSwiperRef ] = useState( null )
  const today = new Date().getDay()

  const setupWeekMeals = async () => {
    const meals = await createMealWeek()
    setWeek( meals )
  }

  // const slideTo = ( index ) => {
  //   swiperRef.slideTo( index - 1, 0 )
  // }

  useEffect(() => {
    setupWeekMeals()
  }, [] )

  // useEffect(() => {
  //   slideTo( today )
  // }, [ week ] )

  return (
    <>
      <Swiper
        // onSwiper={setSwiperRef}
        effect={'cards'}
        grabCursor={true}
        modules={[ EffectCards, Virtual, Pagination ]}
        className='mySwiper'
        pagination={{
          dynamicBullets: true,
          // type: 'bullets'
        }}
        virtual
      >
        {week.map(( weekday, index ) => {
          return (
            <SwiperSlide key={weekday.day} virtualIndex={index} >
              <MealCard day={weekday.day} lunch={null} dinner={weekday.dinner} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}

export default FreyrV2
