import React, {useContext} from 'react'
import { Card, Grid, Box } from '@mui/material'
import StatusContext from '../utilities/StatusContext'

const StatusOverall = () => {
    const {state, dispatch} = useContext(StatusContext)

    return (
        <Box className='status-box' >
            <Grid container columnSpacing={5}>
                <Grid item xs={6}>
                    <div className='key-value-container'>
                        <div className='labels'>
                            <p> Status (nox): </p>
                            <p> Status (HASS): </p>
                        </div>
                        <div className='values'>
                            <p> <img src={state.indicator} width={25} height={15} /> {state.status} </p>
                            <p> TDB </p>
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

export default StatusOverall
