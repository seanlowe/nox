import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAddressCard,
  faGear,
  faHome,
  faInbox,
} from '@fortawesome/free-solid-svg-icons'

// when adding a new navigation item, add the appropriate nav object 
// here in the order that you wish for them to appear
export const generateNavActions = ( home ) => {
  const actions = [
    { icon: <FontAwesomeIcon icon={faHome} />, FabProps: { href: '/' }, key: 'Home' },
    { icon: <FontAwesomeIcon icon={faGear} />, FabProps: { href: '/settings' }, key: 'Settings' },
    { icon: <FontAwesomeIcon icon={faInbox} />, FabProps: { href: '#' }, key: 'Logs' },
    { icon: <FontAwesomeIcon icon={faAddressCard} />, FabProps: { href: '#' }, key: 'Contacts' },
  ]

  if ( home ) {
    actions.shift()
  }

  return actions
}
