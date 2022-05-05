import Head from 'next/head'
import Layout from '../components/layout'
import { MuuriComponent } from 'muuri-react'
import Weather from '../components/workers/Weather'
import WikiSearch from '../components/workers/WikiSearch'
import StatusModal from '../components/StatusModal'

const MuuriPage = () => {
	return (
		<>
			<Head>
				<title>Muuri test page</title>
			</Head>
			<Layout>
				<MuuriComponent dragEnabled>
					<div key='wiki'>
						<WikiSearch />
					</div>
					<div key='status'>
						<StatusModal />
					</div>
					<div key='copy'>
						<Weather />
					</div>
				</MuuriComponent>
			</Layout>
		</>
	)
}

export default MuuriPage
