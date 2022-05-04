import {useState} from 'react'
import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
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

const Nav = ({home}) => {
	// todo: dynamic nav dropdown list?
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div id="nav-sidebar">
			<div className="container">
				<ul className="nav-dropdown">
					{!isOpen && (
						<li onClick={() => setIsOpen(true)}>
							<a>
								<FontAwesomeIcon icon={faBars} />
							</a>
						</li>
					)}
					{isOpen && (
						<>
							{home ? (
								<li onClick={() => setIsOpen(false)}>
									<a>
										<FontAwesomeIcon icon={faArrowLeft} />
									</a>
								</li>
							) : (
								<li>
									<NavItem path="/" icon={faHome} />
								</li>
							)}
							<li>
								<NavItem path="/settings" icon={faGear} />
							</li>
							<li>
								<NavItem path="/muuri" icon={faInbox} />
							</li>
							<li>
								<NavItem path="#" icon={faAddressCard} />
							</li>
							<li>
								<NavItem path="#" icon={faCloud} />
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
