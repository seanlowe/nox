import {useReducer} from 'react'
import Head from 'next/head'
import Header from './layouts/Header'
import Nav from './nav/Nav'
import StatusContext from '../utilities/StatusContext'

const name = 'nox'
export const siteTitle = 'nox Dashboard'

const initialState = {
  indicator: '/images/status_red.png',
  status: 'offline'
}

const statusReducer = (state, action) => {
  switch (action.type) {
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
          throw new Error(`No matching action defined in statusReducer (${type})`)
  }
}

function init() {
  return initialState
}

const Layout = ({ children, home }) => {
  const [state, dispatch] = useReducer(statusReducer, {}, init)
  const statusIconPath = state.indicator

  return (
    <StatusContext.Provider value={{ state, dispatch }}>
      <div className='container'>
        <Head>
          <link rel='icon' href={statusIconPath} />
          <meta name='og:title' content={siteTitle} />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <head>
          <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'/>
        </head>
        <header className='header'>
          <Header name={name} icon={statusIconPath} />
          <Nav home={home} />
        </header>
          {children}
      </div>
    </StatusContext.Provider>
  )
}

export default Layout
