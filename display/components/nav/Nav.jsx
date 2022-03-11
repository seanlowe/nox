import {useState} from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

const Nav = ({home}) => {
    // todo: dynamic nav dropdown list?
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div id='nav-sidebar'>
            <div className='container'>
                <ul className="nav-dropdown">
                    {!isOpen && 
                        <li>
                            <a><i id="hamburger" className='fa fa-bars' onClick={() => setIsOpen(true)}></i></a>
                        </li>
                    }
                    {isOpen &&
                        <>
                            <li>
                                {!home &&
                                    <Link href='/'>
                                        <a><i className='fa fa-home'></i></a>
                                    </Link>
                                }
                                {home &&
                                    <a><i className='fa fa-arrow-left' onClick={() => setIsOpen(false)}></i></a>
                                }
                            </li>
                            <li>
                                <Link href='/settings'>
                                    <a><i className='fa fa-gear'></i></a>
                                </Link>
                            </li>
                            <li>
                                <Link href='#'>
                                    <a><i className='fa fa-inbox'></i></a>
                                </Link>
                            </li>
                            <li>
                                <Link href='#'>
                                    <a><i className='fa fa-address-card'></i></a>
                                </Link>
                            </li>
                            <li>
                                <Link href='#'>
                                    <a><i className='fa fa-cloud'></i></a>
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
