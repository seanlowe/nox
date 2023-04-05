import { useEffect, useState } from 'react'
import { SERVER_STATE } from '../../services/react/StatusService'
import backendApi from '../instances/axios'

export const useServerStatus = ( name ) => {
  const [ state, setState ] = useState( SERVER_STATE.LOADING )

  useEffect(() => {
    let interval
    function checkStatus() {
      interval = setTimeout( async () => {
        const { data: serverState } = await backendApi.get( `/status/${name}` )
        setState( serverState )
        checkStatus()
      }, 15000 )
    }

    checkStatus()
    return () => {
      clearTimeout( interval )
    }
  }, [ name ] )

  return state
}
