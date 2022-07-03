import { useContext } from 'react'
import Head from 'next/head'
import Banner from './layouts/Banner'
import StatusContext from '../utilities/contexts/StatusContext'
import NavV2 from './nav/V2/NavV2'

const Layout = ({ children, home }) => {
  const { state } = useContext( StatusContext )
  const name = 'nox'
  const siteTitle = 'nox Dashboard'

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <link rel='icon' href={state.indicator} />
        <meta name='og:title' content={siteTitle} />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <div className='container'>
        <div className='header'>
          <Banner name={name} />
          <NavV2 home={home} />
        </div>
        <div className='content'>{children}</div>
      </div>
    </>
  )
}

export default Layout
