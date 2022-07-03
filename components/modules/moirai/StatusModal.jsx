import React, { useContext } from 'react'
import { Grid, CardHeader, Card, CardContent } from '@mui/material'
import StatusContext from '../../../utilities/contexts/StatusContext'
import { useHomeAssistant } from '../../../utilities/hooks/useHomeAssistant'
import { formatHassState } from '../../../services/HassService'

const StatusModal = () => {
  const { state } = useContext( StatusContext )
  const haState = useHomeAssistant()
  const hassDisplayStatus = formatHassState( haState )
  const noxDisplayStatus = (
    <p>
      <img src={state.indicator} width={25} height={15} /> {state.status}
    </p>
  )

  return (
    <Card variant='outlined' className='status-box'>
      <CardHeader title='Status' className='status-title'/>
      <CardContent>
        {/* 2 columns */}
        <Grid container columnSpacing={4}> 
          {/* 2 columns inside that */}
          <Grid item className='status-keys'>
            <Grid item> 
              <p> nox: </p>
            </Grid>
            <Grid item> 
              <p> HASS: </p>
            </Grid>
          </Grid>
          <Grid item className='status-values'>
            <Grid item> 
              {noxDisplayStatus}
            </Grid>
            <Grid item className='hass-value'> 
              {hassDisplayStatus}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatusModal
