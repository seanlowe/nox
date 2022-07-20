const shell = require( 'shelljs' )
const { HASS_STATE } = require( '../../services/react/HassService' )

const getHassStatus = () => {
  let currentStatus = ''
  const address = process.env.HA_IP_ADDRESS
  const port = process.env.HA_PORT

  const response = shell.exec( `nc -vz ${address} ${port} 2> /dev/null` )
  if ( response.code !== 0 ) {
    currentStatus = HASS_STATE.OFFLINE
  } else {
    currentStatus = HASS_STATE.ONLINE
  }

  return currentStatus
}

export default function handler( req, res ) {
  const hassStatus = getHassStatus()
  res.status( 200 ).json({ hassStatus })
}
