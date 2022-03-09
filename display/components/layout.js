import {useState} from 'react'
import Head from 'next/head'
import Header from './layouts/Header'
import Nav from './nav/Nav'

const name = 'nox'
export const siteTitle = 'nox Dashboard'

const Layout = ({ children, home }) => {
  const {status, setStatus} = useState('offline')
  const statusIconPath = status === 'online' ? '/images/status_blue.png' : '/images/status_red.png'

  return (
    <div className='container'>
      <Head>
        <link rel='icon' href={statusIconPath} />
        <meta name='og:title' content={siteTitle} />
      </Head>
      <head>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'/>
      </head>
      <header className='header'>
        <Header name={name} icon={statusIconPath} />
        <Nav home={home} />
      </header>
      <main>{children}</main>
    </div>
  )
}

export default Layout
