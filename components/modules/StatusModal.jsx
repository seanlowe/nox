import React, { useContext } from 'react'
import { Grid, Box } from '@mui/material'
import StatusContext from '../../utilities/contexts/StatusContext'
import { useHomeAssistant } from '../../utilities/hooks/useHomeAssistant'
import { formatHassState } from '../../services/HassService'

const StatusModal = () => {
  const { state } = useContext( StatusContext )
  const haState = useHomeAssistant()
  const hassDisplayStatus = formatHassState( haState )

  return (
    <Box className='status-box'>
      <Grid container columnSpacing={5}>
        <Grid item xs={6}>
          <div className='key-value-container'>
            <div className='labels'>
              <p> Status (nox): </p>
              <p> Status (HASS): </p>
            </div>
            <div className='values'>
              <p>
                <img src={state.indicator} width={25} height={15} /> {state.status}
              </p>
              {hassDisplayStatus}
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className='key-value-container'>
            <div className='labels'>
              <p> label: </p>
              <p> label: </p>
            </div>
            <div className='values'>
              <p> value 1 </p>
              <p> value 2 </p>
            </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  )
}

export default StatusModal
