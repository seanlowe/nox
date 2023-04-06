import { useEffect, useReducer } from 'react'
import '../styles/global.scss'
import StatusContext from '../utilities/contexts/StatusContext'
import { initStatusReducer, statusReducer, offlineState } from '../utilities/reducers/statusReducer'

// fix fontAwesome icon weirdness with next.js
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function App({ Component, pageProps }) {
  const [ state, dispatch ] = useReducer( statusReducer, offlineState )

  useEffect(() => {
    async function fetchAndSetInitialState() {
      const initialState = await initStatusReducer()
      dispatch({ type: 'setStatus', payload: initialState })
    }
    fetchAndSetInitialState()
  }, [] )

  return (
    <StatusContext.Provider value={{ state, dispatch }}>
      <Component {...pageProps} />
    </StatusContext.Provider>
  )
}
