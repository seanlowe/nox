import { Grid } from '@mui/material'
import Layout from '../components/layout'
import StatusModal from '../components/StatusModal'
import Weather from '../components/workers/Weather'

export default function Home() {
  return (
    <Layout home>
        <StatusModal />
        <div>
          <Weather />
          <Weather />
        </div>
    </Layout>
  )
}
