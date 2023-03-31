import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'
import backendApi from '../../utilities/instances/axios'

const SERVER_STATE = {
  ONLINE: 'Running',
  OFFLINE: 'Stopped',
  LOADING: 'Loading',
}

// state will be one of SERVER_STATE
export const formatServerState = ( state ) => {
  let faClassname = ''
  let statusIcon = faSpinner
  if ( !state || state !== SERVER_STATE.LOADING ) {
    faClassname = `hass-${state === SERVER_STATE.ONLINE ? 'green' : 'red'}`
    statusIcon = state === SERVER_STATE.ONLINE ? faCheck : faXmark
  }

  return (
    <div className='hass-status'>
      <FontAwesomeIcon 
        className={faClassname}
        id={`hass-${state.toString().toLowerCase()}`}
        icon={statusIcon}
      />
      {' '}{state}
    </div>
  )
}

export const formatNoxState = ( state ) => {
  return (
    <>
      <img src={state.indicator} className='status-nox-indicator' /> {state.status}
    </>
  )
}

export const convertBackendServerToFrontendServer = ( server ) => {
  const { Name: name } = server
  const valueStyle = 'status-v2-hass'

  const formattedServer = {
    label: name,
    name,
    value: formatServerState( 'Loading' ),
    valueStyle
  }

  return formattedServer
}


export const getListOfServers = async () => {
  const { data } = await backendApi.get( '/status' )

  if ( !data.length ) {
    console.log( 'there are no servers in the db' )
    return []
  }

  const servers = []
  data.forEach(( server ) => {
    const newServer = convertBackendServerToFrontendServer( server )

    servers.push( newServer )
  })

  return servers
}

export const getNoxStatus = async () => {
  try {
    const { status } = await backendApi.get( '/uptime' )

    if ( status === 200 ) {
      return true
    }
  } catch ( error ) {
    return false
  }
}

// need to export SERVER_STATE this way due to using it in both React and backend JS scripts
module.exports.SERVER_STATE = SERVER_STATE
