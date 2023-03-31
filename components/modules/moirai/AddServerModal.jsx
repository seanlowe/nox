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

const AddServerModal = () => {
  const [ open, setOpen ] = useState( false )
  const defaultFormValues = {
    name: '',
    host: '',
    port: '',
  }
  const [ formValues, setFormValues ] = useState( defaultFormValues )

  const handleInputChange = ( e ) => {
    setFormValues(( prevState ) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      } 
    })
  }

  const handleOpen = () => {
    setOpen( true )
  }

  const handleClose = () => {
    setOpen( false )
  }

  const handleSubmit = async ( e ) => {
    e.preventDefault()
    try {
      const response = await backendApi.post( '/status', formValues )

      console.log( response )
    } catch ( error ) {
      console.log( error )
    }

    // uncomment when ready to reset form values on submit
    // setFormValues( defaultFormValues )
    handleClose()
  }

  const defaultTextInputProps = {
    fullWidth: true,
    variant: 'standard',
    className: 'add-server-input',
    onChange: handleInputChange
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
              value={formValues.name || ''}
              {...defaultTextInputProps}
            />
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <TextField
                  id='host'
                  label='Hostname or IP address'
                  type='text'
                  value={formValues.host || ''}
                  {...defaultTextInputProps}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id='port'
                  label='Port'
                  type='number'
                  value={formValues.port || ''}
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

export default AddServerModal
