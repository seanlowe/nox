import {useContext} from 'react'
import Head from 'next/head'
import Header from './layouts/Header'
import Nav from './nav/Nav'
import StatusContext from '../utilities/StatusContext'

const name = 'nox'
export const siteTitle = 'nox Dashboard'

const Layout = ({ children, home }) => {
  const {state} = useContext(StatusContext)

  return (
    <>
      <Head>
        <link rel='icon' href={state.indicator} />
        <meta name='og:title' content={siteTitle} />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <head>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'/>
      </head>
      <div className='container'>
        <div className='header'>
          <Header name={name} />
          <Nav home={home} />
        </div>
        {children}
      </div>
    </>
  )
}

export default Layout
