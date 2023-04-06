import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import PropTypes from 'prop-types'
import StatusContext from '../../utilities/contexts/StatusContext'
import { useMediaQuery } from 'react-responsive'

const Banner = ({ name = 'nox' }) => {
  const { state } = useContext( StatusContext )
  const [ bannerImage, setBannerImage ] = useState( '/images/status_red.png' )
  const isMobile = useMediaQuery({ query: '(max-width: 700px)' })

  useEffect(() => {
    setBannerImage( state.indicator )
  }, [ state.indicator ] )

  return (
    <div className='horizon'>
      {!isMobile && (
        <Image
          priority
          src={bannerImage}
          className='banner-image'
          height={100}
          width={175}
          alt=''
        />
      )}
      <span className='headline'>{name}</span>
    </div>
  )
}

Banner.propTypes = {
  name: PropTypes.string,
}

export default Banner
