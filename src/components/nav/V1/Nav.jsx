import { useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAddressCard,
  faArrowLeft,
  faBars,
  faCloud,
  faGear,
  faHome,
  faInbox,
} from '@fortawesome/free-solid-svg-icons'
import NavItem from './NavItem'

// at time of using V2: might come back to this later when I can make
// it more dynamic while still using Next.js Link component

const Nav = ({ home }) => {
  const [ isOpen, setIsOpen ] = useState( false )

  return (
    <div id='nav-sidebar'>
      <div className='container'>
        <ul className='nav-dropdown'>
          {!isOpen && (
            <li onClick={() => {
              return setIsOpen( true ) 
            }}>
              <a>
                <FontAwesomeIcon icon={faBars} />
              </a>
            </li>
          )}
          {isOpen && (
            <>
              {home ? (
                <li onClick={() => {
                  return setIsOpen( false ) 
                }}>
                  <a>
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </a>
                </li>
              ) : (
                <li>
                  <NavItem path='/' icon={faHome} />
                </li>
              )}
              <li>
                <NavItem path='/settings' icon={faGear} />
              </li>
              <li>
                <NavItem path='#' icon={faInbox} />
              </li>
              <li>
                <NavItem path='#' icon={faAddressCard} />
              </li>
              <li>
                <NavItem path='#' icon={faCloud} />
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

Nav.propTypes = {
  home: PropTypes.bool,
}

export default Nav
