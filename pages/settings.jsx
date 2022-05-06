import Head from 'next/head'
import Layout from '../components/layout'
import { WorkerSlides } from '../components/data/slides'
import Slider from '../components/modules/Slider'

const SettingsPage = () => {
	return (
		<>
			<Head>
				<title>Settings</title>
			</Head>
			<Layout>
				<Slider slides={WorkerSlides} />
			</Layout>
		</>
	)
}

export default SettingsPage
