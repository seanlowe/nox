import React, { useState } from 'react'
import { ImageSlides } from './data/ImageSlides'
import Image from 'next/image'

const ImageSlider = ({ slides }) => {
	const [current, setCurrent] = useState(0)
	const length = slides.length

	const nextSlide = () => {
    	setCurrent(current === length - 1 ? 0 : current + 1)
	};

	const prevSlide = () => {
		setCurrent(current === 0 ? length - 1 : current - 1)
	};

	if (!Array.isArray(slides) || slides.length <= 0) {
		return null;
	}

	return (
		<div className="slider-container">
			<i id='left-arrow' className='fa fa-arrow-left' onClick={prevSlide}></i>
			{ImageSlides.map((slide, index) => (
				<div
					className={`slide ${index === current ? 'active' : ''}`}
					key={index}
				>
					{index === current && (
						<Image
							className='image'
							src={slide.image}
							height={400}
							width={400}
							alt='image'
						/>
					)}
				</div>
			))}
			<i id='right-arrow' className='fa fa-arrow-right' onClick={nextSlide}></i>
		</div>
	)
}

export default ImageSlider
