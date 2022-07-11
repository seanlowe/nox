import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEllipsis, faXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'

export const HASS_STATE = {
  ONLINE: 'Running',
  OFFLINE: 'Stopped',
  LOADING: 'Loading',
}

export const formatHassState = ( state ) => {
  switch( state ) {
  case HASS_STATE.ONLINE:
    return (
      <div className='hass-status'>
        <FontAwesomeIcon
          className='hass-green'
          id='hass-online'
          icon={faCheck}
        />
        {' '}{HASS_STATE.ONLINE}
      </div>
    )

  case HASS_STATE.OFFLINE:
    return (
      <div className='hass-status'>
        <FontAwesomeIcon
          className='hass-red'
          id='hass-offline'
          icon={faXmark}
        />
        {' '}{HASS_STATE.OFFLINE}
      </div>
    )

  case HASS_STATE.LOADING:
  default:
    return (
      <div className='hass-status'>
        <FontAwesomeIcon id='hass-loading' icon={faSpinner} /> {HASS_STATE.LOADING}
      </div>
    )
  }
}

export const formatNoxState = ( state ) => {
  return (
    <>
      <img src={state.indicator} className='status-nox-indicator' /> {state.status}
    </>
  )
}