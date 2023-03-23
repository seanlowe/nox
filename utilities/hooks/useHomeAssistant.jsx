import { useEffect, useState } from 'react'
import { HASS_STATE } from '../../services/react/HassService'
import axios from 'axios'

export const useHomeAssistant = () => {
  const [ state, setState ] = useState( HASS_STATE.LOADING )

  useEffect(() => {
    let interval
    function checkStatus() {
      interval = setTimeout( async () => {
        const { data: response } = await axios.get( '/api/hass' )
        setState( response.hassStatus )
        checkStatus()
      }, 15000 )
    }

    checkStatus()
    return () => {
      clearTimeout( interval )
    }
  }, [] )

  return state
}
