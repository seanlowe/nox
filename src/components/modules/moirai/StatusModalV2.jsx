import React, { Suspense, useEffect, useState } from 'react'
import { Grid, CardHeader, Card, CardContent } from '@mui/material'
import LabelWithValue from './LabelWithValue'
import AddServerModal from './AddServerModal'
import LoadingSpinner from '../../layouts/LoadingSpinner'
import {
  convertBackendServerToFrontendServer,
  getListOfServers
} from '../../../services/StatusService'

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

  const addServerToList = ( newServer ) => {
    const formattedServer = convertBackendServerToFrontendServer( newServer )
    setFullServerList( [ ...fullServerList, formattedServer ] )
  }

  // on first load, grab all servers from the DB and add them to
  // our state controlled server list
  useEffect(() => {
    buildServersList()
  }, [] )

  return (
    <Suspense fallback={LoadingSpinner}>
      <Card variant='outlined' className='card card-status'>
        <CardHeader title='Status V2' className='status-title'/>
        <CardContent className='status-content'>
          <Grid container columnSpacing={4} className='status-v2-grid-container'>
            {fullServerList.map(( server ) => {
              return <LabelWithValue key={server.name} {...server} />
            })}
          </Grid>
          <AddServerModal listCallback={addServerToList} />
        </CardContent>
      </Card>
    </Suspense>
  )
}

export default StatusModalV2
