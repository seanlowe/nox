// import { getNoxStatus } from '../../services/StatusService'
import { getNoxStatus } from '../../services/StatusService'
// import statusRed from '/public/images/status_red.png'
// import statusBlue from '/public/images/status_blue.png'
// import statusRed from '/images/status_red.jpg'
// import statusBlue from '/images/status_blue.jpg'

export const offlineState = {
  // indicator: '/images/status_red.jpg',
  indicator: '/images/status_red.png',
  // indicator: statusRed,
  status: 'offline',
}

const onlineState = {
  // indicator: '/images/status_blue.jpg',
  indicator: '/images/status_blue.png',
  // indicator: statusBlue,
  status: 'online',
}

export const statusReducer = ( state, action ) => {
  switch ( action.type ) {
  case 'setOffline':
    return offlineState
  case 'setOnline':
    return onlineState
  case 'setStatus':
    return action.payload
  default:
    throw new Error( `No matching action defined in statusReducer (${type})` )
  }
}

export async function initStatusReducer() {
  const isOnline = await getNoxStatus()

  return isOnline ? onlineState : offlineState
}
