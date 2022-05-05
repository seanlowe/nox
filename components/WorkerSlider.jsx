import React, { useState } from 'react'
import { WorkerSlides } from './data/WorkerSlides'

const WorkerSlider = ({ slides }) => {
	const [ current, setCurrent ] = useState( 0 )
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
			<i id='left-arrow' className='fa fa-arrow-left' onClick={prevSlide} />
			{WorkerSlides.map(( slide, index ) => { 
				return (
					<div className={`slide ${index === current ? 'active' : ''}`} key={index}>
						{index === current && <div>{slide.worker}</div>}
					</div>
				)
			})}
			<i id='right-arrow' className='fa fa-arrow-right' onClick={nextSlide} />
		</div>
	)
}

export default WorkerSlider
