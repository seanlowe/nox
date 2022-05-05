import Link from 'next/link'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NavItem = ({ path, icon }) => {
	return (
		<Link href={path}>
			<a>
				<FontAwesomeIcon icon={icon} />
			</a>
		</Link>
	)
}

NavItem.propTypes = {
	path: PropTypes.string,
	icon: PropTypes.element,
}

export default NavItem
