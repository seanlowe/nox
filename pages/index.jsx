import Layout from '../components/layout'
import StatusModal from '../components/modules/StatusModal'
import Weather from '../components/modules/Weather'
import Freyr from '../components/modules/freyr/Freyr'

export default function Home() {
  return (
    <Layout home>
      <StatusModal />
      <Weather />
      <Freyr />
    </Layout>
  )
}
