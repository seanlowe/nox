import React, { useContext, useEffect, useState } from 'react'
import StatusContext from '../../../utilities/contexts/StatusContext'
import { PropTypes } from 'prop-types'
import { formatServerState, formatNoxState } from '../../../services/react/StatusService'
import { useServerStatus } from '../../../utilities/hooks/useServerStatus'

const LabelWithValue = ({ label, name, value = null, valueStyle = null }) => {
  const { state: noxState } = useContext( StatusContext )
  const serverState = useServerStatus( name )

  let serverValue = null
  if ( name !== 'nox' ) {
    serverValue = formatServerState( serverState )
  } else {
    serverValue = formatNoxState( noxState )
  }

  return (
    <div className='status-v2-key-value-pair'>
      <label title={label} htmlFor={name} >
        {label}:
      </label>
      <div name={name} className={valueStyle} >
        {serverValue || value}
      </div>
    </div>
  )
}

LabelWithValue.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.element,
  value: PropTypes.string,
}

export default LabelWithValue
