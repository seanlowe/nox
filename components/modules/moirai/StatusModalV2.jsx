import React, { useEffect, useState } from 'react'
import { Grid, CardHeader, Card, CardContent } from '@mui/material'
import { getListOfServers } from '../../../services/react/StatusService'
import LabelWithValue from './LabelWithValue'
import AddServerModal from './AddServerModal'

const StatusModalV2 = () => {
  const [ fullServerList, setFullServerList ] = useState( [] )
  
  // building the full list of servers, including nox.
  const buildServersList = async () => {
    const newServerList = [
      {
        label: 'nox',
        name: 'nox',
      }
    ]

    try {
      const dbServers = await getListOfServers()
      newServerList.push( ...dbServers )
    } catch ( error ) {
      console.log( 'nox is offline' )
    }

    setFullServerList( newServerList )
  }

  // on first load, grab all servers from the DB and add them to
  // our state controlled server list
  useEffect(() => {
    buildServersList()
  }, [] )

  return (
    <Card variant='outlined' className='card card-status'>
      <CardHeader title='Status V2' className='status-title'/>
      <CardContent className='status-content'>
        <Grid container columnSpacing={4} className='status-v2-grid-container'>
          {fullServerList.map(( server ) => {
            return <LabelWithValue key={server.name} {...server} />
          })}
        </Grid>
        <AddServerModal />
      </CardContent>
    </Card>
  )
}

export default StatusModalV2
