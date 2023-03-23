import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'

const HASS_STATE = {
  ONLINE: 'Running',
  OFFLINE: 'Stopped',
  LOADING: 'Loading',
}

export const formatHassState = ( state ) => {
  let faClassname = ''
  let statusIcon = faSpinner
  if ( !state || state !== HASS_STATE.LOADING ) {
    faClassname = `hass-${state === HASS_STATE.ONLINE ? 'green' : 'red'}`
    statusIcon = state === HASS_STATE.ONLINE ? faCheck : faXmark
  }

  return (
    <div className='hass-status'>
      <FontAwesomeIcon 
        className={faClassname}
        id={`hass-${state.toLowerCase()}`}
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

module.exports.HASS_STATE = HASS_STATE
