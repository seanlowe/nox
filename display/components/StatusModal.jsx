import React, {useContext} from 'react'
import { Card, CardMedia, CardActions, Typography, Button, CardContent} from '@mui/material'
import StatusContext from '../utilities/StatusContext'

const StatusModal = () => {
    const {state, dispatch} = useContext(StatusContext)

    return (
        <Card variant="outlined">
            <CardMedia
                component="img"
                height="300"
                image={state.indicator}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    onClick={() => {
                        dispatch({type: 'setOnline'})}
                    }
                >
                    set online
                </Button>
                <Button
                    size="small"
                    onClick={() => {
                        dispatch({type: 'setOffline'})}
                    }
                >
                    set offline
                </Button>
            </CardActions>
        </Card>
    )
}

export default StatusModal
