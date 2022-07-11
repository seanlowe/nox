import Layout from '../components/layout'
import StatusModalV2 from '../components/modules/moirai/V2/StatusModalV2'
import Weather from '../components/modules/anemoi/Weather'
import FreyrV2 from '../components/modules/freyr/V2/FreyrV2'

export default function Home() {
  return (
    <Layout home>
      <StatusModalV2 />
      <Weather />
      <FreyrV2 />
    </Layout>
  )
}
