import { getNoxStatus } from '../../services/react/StatusService'

export const offlineState = {
  indicator: '/images/status_red.png',
  status: 'offline',
}

const onlineState = {
  indicator: '/images/status_blue.png',
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
