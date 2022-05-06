import Layout from '../components/layout'
import StatusModal from '../components/modules/StatusModal'
import Weather from '../components/modules/Weather'

export default function Home() {
	return (
		<Layout home>
			<StatusModal />
			<div>
				<Weather />
			</div>
		</Layout>
	)
}
