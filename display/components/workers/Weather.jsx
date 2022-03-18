import { useState, useEffect } from 'react'
import { Card } from '@mui/material'
import { fetchWeather } from '../../services/WeatherService'

const Weather = () => {
	const [query, setQuery] = useState('')
	const [weather, setWeather] = useState({})
	const [isLoaded, setIsLoaded] = useState(false)
	
	useEffect( async () => {
		await fetchWeather(query).then(response => setWeather(response))
		setIsLoaded(true)
	}, [])

	const d = new Date()
	const date = d.getDate()
	const year = d.getFullYear()
	const month = d.toLocaleString('default', {month: 'long'})
	const day = d.toLocaleString('default', {weekday: 'long'})

	const time = d.toLocaleString([], {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	})

	const search = async (e) => {
        if (e.key === 'Enter') {
            const data = await fetchWeather(query);

            setWeather(data);
            setQuery('');
        }
    }

	const imageSrc = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`

	return (
		<>
			{isLoaded && (
				<Card sx={{bgcolor: '#1f1e1e'}}>
					<div className='main-container'>
						<input
							type='text'
							className='search'
							placeholder=' &nbsp;Search for a city...'
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							onKeyPress={search}
						/>
						{weather.main && (
							<div className='city'>
								<h2 className='city-name'>
									<span>{weather.name}</span>
									<sup>{weather.sys.country}</sup>
								</h2>
								<p className='date-time'>
									{day}, {month} {date}, {year}
									<br />
									{time}
								</p>
								<div className='city-temp'>
									{Math.round(weather.main.temp)}
									<sup>&deg;F</sup>
								</div>
								<div className='info'>
									<img
										className='city-icon'
										src={imageSrc(weather.weather[0].icon)}
										alt={weather.weather[0].description}
									/>
									<p className='description'>
										{weather.weather[0].description}
									</p>
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
