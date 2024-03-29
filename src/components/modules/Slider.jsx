import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Slider = ({ slides = [], currentSlide = 0 }) => {
  const [ current, setCurrent ] = useState( currentSlide )
  const length = slides.length

  const nextSlide = () => {
    setCurrent( current === length - 1 ? 0 : current + 1 )
  }

  const prevSlide = () => {
    setCurrent( current === 0 ? length - 1 : current - 1 )
  }

  if ( !Array.isArray( slides ) || slides.length <= 0 ) {
    return null
  }

  return (
    <div className='slider-container'>
      <FontAwesomeIcon id='left-arrow' icon={faArrowLeft} onClick={prevSlide} />
      {slides.map(( slide, index ) => { 
        return (
          <div className={`slide ${index === current ? 'active' : ''}`} key={index}>
            {index === current && <div> { slide.item } </div>}
          </div>
        )
      })}
      <FontAwesomeIcon id='right-arrow' icon={faArrowRight} onClick={nextSlide} />
    </div>
  )
}

Slider.propTypes = {
  slides: PropTypes.Array,
  currentSlide: PropTypes.number,
}

export default Slider
