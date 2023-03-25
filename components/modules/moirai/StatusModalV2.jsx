import React, { useContext } from 'react'
import { Grid, CardHeader, Card, CardContent } from '@mui/material'
import StatusContext from '../../../utilities/contexts/StatusContext'
import { useHomeAssistant } from '../../../utilities/hooks/useHomeAssistant'
import { formatHassState, formatNoxState } from '../../../services/react/HassService'
import LabelWithValue from './LabelWithValue'
import SimpleModal2 from './AddServerModal'

const StatusModalV2 = () => {
  const { state: noxState } = useContext( StatusContext )
  const noxDisplayStatus = formatNoxState( noxState )

  const HA_ENABLED = process.env.HA_ENABLED === 'true'
  let hassDisplayStatus
  if ( HA_ENABLED ) {
    const haState = useHomeAssistant()
    hassDisplayStatus = formatHassState( haState )
  }

  return (
    <Card variant='outlined' className='card card-status'>
      <CardHeader title='Status V2' className='status-title'/>
      <CardContent className='status-content'>
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
        <SimpleModal2 />
      </CardContent>
    </Card>
  )
}

export default StatusModalV2
