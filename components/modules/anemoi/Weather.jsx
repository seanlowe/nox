import { useContext, useEffect, useState } from 'react'
import { Card, CircularProgress } from '@mui/material'
import { imageSrc } from '../../../services/react/WeatherService'
import StatusContext from '../../../utilities/contexts/StatusContext'
import Offline from '../../layouts/Offline'
import axios from 'axios'

const Weather = () => {
  const { state: { status: noxStatus } } = useContext( StatusContext )

  if ( noxStatus === 'offline' ) {
    console.log( 'nox is offline, cannot retrieve weather' )

    return <Offline message='Cannot retrieve weather data.' />
  }

  const [ query, setQuery ] = useState( '' )
  const [ weather, setWeather ] = useState({})
  const [ isLoading, setIsLoading ] = useState( false )
  const [ isFetching, setIsFetching ] = useState( false )
  const BACKEND_HOST = process.env.BACKEND_HOST
  const BACKEND_PORT = process.env.BACKEND_PORT

  const fetchAndSetWeather = async () => {
    setIsLoading( true )
    const { data: response } = await axios.get( `${BACKEND_HOST}:${BACKEND_PORT}/weather` )
    setWeather( response )
    setIsLoading( false )
  }

  useEffect(() => {
    fetchAndSetWeather()
  }, [] )

  const search = async ( e ) => {
    if ( e.key !== 'Enter' ) {
      return 
    }

    setIsFetching( true )
    const { data: response } = await axios.get( `${BACKEND_HOST}:${BACKEND_PORT}/weather?${query}` )
    setWeather( response )

    setQuery( '' )
    setIsFetching( false )
  }

  const renderSearchIcon = () => {
    if ( isFetching ) {
      return (
        <CircularProgress
          className='icon-scale'
          onClick={() => {
            return search({ key: 'Enter' }) 
          }}
        />
      )
    }

    return <i className='fa fa-search' onClick={() => {
      return search({ key: 'Enter' }) 
    }} />
  }

  return (
    <>
      {isLoading && (
        <Card className='card card-spinner'>
          <CircularProgress className='weather-spinner'/>
        </Card>
      )}
      {!isLoading && (
        <Card className='card card-weather'>
          <div className='main-container'>
            <div className='search-bar'>
              <input
                type='text'
                className='search'
                placeholder='Search for a city...'
                value={query}
                onChange={( e ) => {
                  return setQuery( e.target.value ) 
                }}
                onKeyPress={search}
              />
              <div className='search-icon'>{renderSearchIcon()}</div>
            </div>
            {weather.main && (
              <div className='city'>
                <h2 className='city-name'>
                  <span>{weather.name}</span>
                  <sup>{weather.sys.country}</sup>
                </h2>
                <div className='city-temp'>
                  {Math.round( weather.main.temp )}
                  <sup>&deg;F</sup>
                </div>
                <div className='info'>
                  <img
                    className='city-icon'
                    src={imageSrc( weather.weather[0].icon )}
                    alt={weather.weather[0].description}
                  />
                  <p className='description'>{weather.weather[0].description}</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </>
  )
}

export default Weather
