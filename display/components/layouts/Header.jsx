import {useContext} from 'react'
import Image from 'next/image'
import PropTypes from 'prop-types'
import StatusContext from '../../utilities/StatusContext'

const Header = ({name}) => {
    const {state} = useContext(StatusContext)

    return (
        <div className='horizon'>
            <Image
                priority
                src={state.indicator}
                className='borderCircle'
                height={100}
                width={175}
                alt={name}
            />
            <div id='content'>
                <center>
                    <span className='headline'>{name}</span>
                </center>
            </div>
        </div>
    )
}

Header.propTypes = {
    name: PropTypes.string,
}

export default Header
