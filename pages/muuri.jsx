import Head from 'next/head'
import Layout from '../components/layout'
import { MuuriComponent } from 'muuri-react'
import Weather from '../components/modules/Weather'
import WikiSearch from '../components/modules/WikiSearch'
import StatusModal from '../components/modules/StatusModal'

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
