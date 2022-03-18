import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import StatusModal from '../components/StatusModal'

export default function Home() {
  return (
    <>
      <Head>
          <title>{siteTitle}</title>
      </Head>
      <Layout home>
          <StatusModal />
      </Layout>
    </>
  )
}
