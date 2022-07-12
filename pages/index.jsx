import Layout from '../components/layout'
import StatusModalV2 from '../components/modules/moirai/StatusModalV2'
import Weather from '../components/modules/anemoi/Weather'
import FreyrV3 from '../components/modules/freyr/FreyrV3'

export default function Home() {
  return (
    <Layout home>
      <StatusModalV2 />
      <Weather />
      <FreyrV3 />
    </Layout>
  )
}
