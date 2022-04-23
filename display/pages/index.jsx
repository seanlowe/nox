import Layout from '../components/layout'
import StatusModal from '../components/StatusModal'
import StatusOverall from '../components/StatusOverall'

export default function Home() {
  return (
    <Layout home>
        <StatusModal />
        <StatusOverall />
    </Layout>
  )
}
