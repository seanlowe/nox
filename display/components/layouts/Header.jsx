import Image from 'next/image'
import PropTypes from 'prop-types'

const Header = ({name}) => {
    return (
        <div className='horizon'>
            <Image
                priority
                src='/images/status_blue.png'
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
