import { useEffect, useState } from 'react'
import axios from 'axios'

export const useHomeAssistant = () => {
	const [ state, setState ] = useState( 'Loading' )

	useEffect(() => {
		let interval
		function checkStatus() {
			interval = setTimeout( async () => {
				const { data: response } = await axios.get( '/api/hass' )
				setState( response.hassStatus )
				checkStatus()
			}, 10000 )
		}

		checkStatus()
		return () => {
			clearTimeout( interval )
		}
	}, [] )

	return state
}
