import { useContext } from 'react'
import Image from 'next/image'
import PropTypes from 'prop-types'
import StatusContext from '../../utilities/contexts/StatusContext'
import { useMediaQuery } from 'react-responsive'

const Banner = ({ name = 'nox' }) => {
  const { state } = useContext( StatusContext )
  const isMobile = useMediaQuery({ query: '(max-width: 700px)' })

  return (
    <div className='horizon'>
      {!isMobile && (
        <Image
          priority
          src={state.indicator}
          className='banner-image'
          height={100}
          width={175}
          alt={name}
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
