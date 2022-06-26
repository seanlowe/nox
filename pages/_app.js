import { useReducer } from 'react'
import StatusContext from '../utilities/contexts/StatusContext'
import '../styles/global.scss'

const initialState = {
  indicator: '/images/status_red.png',
  status: 'offline',
}

const statusReducer = ( state, action ) => {
  switch ( action.type ) {
  case 'setOffline':
    return {
      indicator: '/images/status_red.png',
      status: 'offline',
    }
  case 'setOnline':
    return {
      indicator: '/images/status_blue.png',
      status: 'online',
    }
  default:
    throw new Error( `No matching action defined in statusReducer (${type})` )
  }
}

function init() {
  return initialState
}

export default function App({ Component, pageProps }) {
  const [ state, dispatch ] = useReducer( statusReducer, {}, init )

  return (
    <StatusContext.Provider value={{ state, dispatch }}>
      <Component {...pageProps} />
    </StatusContext.Provider>
  )
}
