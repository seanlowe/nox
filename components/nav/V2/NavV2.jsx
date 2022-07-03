import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { generateNavActions } from './NavItemV2'

const NavV2 = ({ home }) => {
  const actions = generateNavActions( home )

  return (
    <SpeedDial
      ariaLabel='navigation speed dial'
      icon={<FontAwesomeIcon icon={faBars} />}
      direction='down'
    >
      {actions.map(( action ) => {
        return (
          <SpeedDialAction
            key={action.key}
            tooltipTitle={action.key}
            tooltipOpen
            tooltipPlacement='right'
            {...action}
          />
        ) 
      })}
    </SpeedDial>
  )
}

NavV2.propTypes = {
  home: PropTypes.bool,
}

export default NavV2
