import Link from 'next/link'
import PropTypes from 'prop-types'
import BackToHome from './BackToHome'

const Nav = ({home}) => {
    // todo: dynamic nav dropdown list?

    return (
        <div id='nav-sidebar'>
            <div class='container'>
                <ul>
                    {!home && (
                        <li>
                            <BackToHome />
                        </li>
                    )}
                    <li>
                        <Link href='/settings'>
                            <a><i class='fa fa-gear'></i></a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

Nav.propTypes = {
    home: PropTypes.bool,
}

export default Nav
