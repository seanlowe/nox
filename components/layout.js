import { useContext } from 'react'
import Head from 'next/head'
import Banner from './layouts/Banner'
import Nav from './nav/Nav'
import StatusContext from '../utilities/contexts/StatusContext'

const name = 'nox'
export const siteTitle = 'nox Dashboard'

const Layout = ({ children, home }) => {
	const { state } = useContext( StatusContext )

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
					<Nav home={home} />
				</div>
				<div className='content'>{children}</div>
			</div>
		</>
	)
}

export default Layout
