import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  InputAdornment,
  Grid
} from '@mui/material'
import backendApi from '../../../utilities/instances/axios'

const SimpleModal2 = () => {
  const [ open, setOpen ] = useState( false )

  const handleOpen = () => {
    setOpen( true )
  }

  const handleClose = () => {
    setOpen( false )
  }

  const handleSubmit = async () => {
    const response = await backendApi.get( '/status/nox' )
    // Handle form submission here
    handleClose()
  }

  const defaultTextInputProps = {
    fullWidth: true,
    variant: 'standard',
    className: 'add-server-input'
  }

  return (
    <div>
      <Button variant='outlined' color='primary' onClick={handleOpen} className='add-server-btn'>
        Add Server 2
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <div className='dialog-content'>
          <DialogTitle>Add a Server</DialogTitle>
          <DialogContent>
            <DialogContentText className='add-server-text'>
              Enter the information specified below to add a server to the list
              of tracked processes.
            </DialogContentText>
            <TextField
              autoFocus
              margin='normal'
              id='name'
              label='Server Name'
              type='text'
              {...defaultTextInputProps}
            />
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <TextField
                  id='host'
                  label='Hostname or IP address'
                  type='email'
                  {...defaultTextInputProps}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id='port'
                  label='Port'
                  type='number'
                  {...defaultTextInputProps}
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>:</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Confirm</Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  )
}

export default SimpleModal2
