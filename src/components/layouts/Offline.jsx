import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { Card, CardHeader, CardContent, Grid } from '@mui/material'
import PropTypes from 'prop-types'

const Offline = ({ message = '' }) => {
  return (
    <Card variant='outlined' className='card card-offline'>
      <CardHeader title='Nox is Offline' className='status-title'/>
      <CardContent>
        <Grid container spacing={2} className='status-v2-grid-container'>
          <Grid item xs={4}>
            <FontAwesomeIcon icon={faExclamationTriangle} size='lg'/>
          </Grid>
          <Grid item xs={8}>
            {message}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

Offline.propTypes = {
  message: PropTypes.string,
}

export default Offline
