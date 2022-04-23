import {useState} from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faArrowLeft, faBars, faCloud, faGear, faHome, faInbox } from '@fortawesome/free-solid-svg-icons'


const Nav = ({home}) => {
    // todo: dynamic nav dropdown list?
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div id='nav-sidebar'>
            <div className='container'>
                <ul className="nav-dropdown">
                    {!isOpen && 
                        <li onClick={() => setIsOpen(true)}>
                            <a><FontAwesomeIcon icon={faBars} /></a>
                        </li>
                    }
                    {isOpen &&
                        <>
                            {home ? (
                                <li onClick={() => setIsOpen(false)}>
                                    <a><FontAwesomeIcon icon={faArrowLeft} /></a>
                                </li>
                            ) : (
                                <li>
                                    <Link href='/'>
                                        <a><FontAwesomeIcon icon={faHome} /></a>
                                    </Link>
                                </li>
                            )}
                            <li>
                                <Link href='/settings'>
                                    <a><FontAwesomeIcon icon={faGear} /></a>
                                </Link>
                            </li>
                            <li>
                                <Link href='/muuri'>
                                    <a><FontAwesomeIcon icon={faInbox} /></a>
                                </Link>
                            </li>
                            <li>
                                <Link href='#'>
                                    <a><FontAwesomeIcon icon={faAddressCard} /></a>
                                </Link>
                            </li>
                            <li>
                                <Link href='#'>
                                    <a><FontAwesomeIcon icon={faCloud} /></a>
                                </Link>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </div>
    )
}

Nav.propTypes = {
    home: PropTypes.bool,
}

export default Nav
