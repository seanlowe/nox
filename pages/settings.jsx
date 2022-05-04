import Head from 'next/head'
import Layout from '../components/layout'
// import ImageSlider from '../components/ImageSlider'
// import { ImageSlides } from '../components/data/ImageSlides'
import {WorkerSlides} from '../components/data/WorkerSlides'
import WorkerSlider from '../components/WorkerSlider'

const SettingsPage = () => {
	return (
		<>
			<Head>
				<title>Settings</title>
			</Head>
			<Layout>
				{/* <ImageSlider slides={ImageSlides} /> */}
				<WorkerSlider slides={WorkerSlides} />
			</Layout>
		</>
	)
}

export default SettingsPage
