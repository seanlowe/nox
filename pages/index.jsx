import Layout from '../components/layout'
import StatusModalV2 from '../components/modules/moirai/V2/StatusModalV2'
import Weather from '../components/modules/anemoi/Weather'
import Freyr from '../components/modules/freyr/Freyr'

export default function Home() {
  return (
    <Layout home>
      <StatusModalV2 />
      <Weather />
      <Freyr />
    </Layout>
  )
}
