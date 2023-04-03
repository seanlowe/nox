import { Card, CircularProgress } from '@mui/material'

const LoadingSpinner = () => {
  return (
    <Card className='card card-spinner'>
      <CircularProgress className='circular-spinner'/>
    </Card>
  )
}

export default LoadingSpinner
