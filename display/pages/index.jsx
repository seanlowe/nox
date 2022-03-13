import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import StatusModal from '../components/StatusModal'

export default function Home() {
  return (
    <Layout home>
        <Head>
            <title>{siteTitle}</title>
        </Head>
        <StatusModal />
    </Layout>
  )
}
