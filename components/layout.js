import { useContext } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import StatusContext from '../utilities/contexts/StatusContext'
import NavV2 from './nav/V2/NavV2'

const Banner = dynamic(() => {
  return import( './layouts/Banner' ) 
}, {
  ssr: false
})

const Layout = ({ children, home }) => {
  const { state } = useContext( StatusContext )
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
          <Banner />
          <NavV2 home={home} />
        </div>
        <div className='content'>{children}</div>
      </div>
    </>
  )
}

export default Layout
