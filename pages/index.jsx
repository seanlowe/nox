import Layout from '../components/layout'
import StatusModalV2 from '../components/modules/moirai/StatusModalV2'
import Weather from '../components/modules/anemoi/Weather'
import FreyrV3 from '../components/modules/freyr/FreyrV3'

export default function Home() {
  // feature flag-esque rendering until I figure out the DB table
  // for which modules are enabled
  const WEATHER_ENABLED = process.env.WEATHER_ENABLED === 'true'

  return (
    <Layout home>
      <StatusModalV2 />
      {WEATHER_ENABLED && <Weather />}
      <FreyrV3 />
    </Layout>
  )
}
