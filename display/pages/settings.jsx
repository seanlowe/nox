import Head from 'next/head'
import Layout from '../components/layout'
import ImageSlider from '../components/ImageSlider'
import { ImageSlides } from '../components/data/ImageSlides'

const SettingsPage = () => {
    return (
        <Layout>
            <Head>
                <title>Settings</title>
            </Head>
            <ImageSlider slides={ImageSlides} />
        </Layout>
    )
}

export default SettingsPage
