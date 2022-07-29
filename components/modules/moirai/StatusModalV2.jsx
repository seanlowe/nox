import React, { useContext } from 'react'
import { Grid, CardHeader, Card, CardContent } from '@mui/material'
import StatusContext from '../../../utilities/contexts/StatusContext'
import { useHomeAssistant } from '../../../utilities/hooks/useHomeAssistant'
import { formatHassState, formatNoxState } from '../../../services/react/HassService'
import LabelWithValue from './LabelWithValue'

const StatusModalV2 = () => {
  const { state: noxState } = useContext( StatusContext )
  const haState = useHomeAssistant()
  const hassDisplayStatus = formatHassState( haState )
  const noxDisplayStatus = formatNoxState( noxState )
  const HA_ENABLED = process.env.HA_ENABLED === 'true'

  return (
    <Card variant='outlined' className='status-box'>
      <CardHeader title='Status V2' className='status-title'/>
      <CardContent>
        <Grid container columnSpacing={4} className='status-v2-grid-container'> 
          <LabelWithValue label='nox' name='nox' value={noxDisplayStatus} />
          {HA_ENABLED &&  
            <LabelWithValue
              label='HASS'
              name='hass'
              value={hassDisplayStatus}
              valueStyle='status-v2-hass'
            />
          }
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatusModalV2
