export const imageSrc = ( icon ) => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png` 
}

export const setUpTime = () => {
  const d = new Date()

  const date = d.getDate()
  const year = d.getFullYear()
  const month = d.toLocaleString( 'default', { month: 'long' })
  const day = d.toLocaleString( 'default', { weekday: 'long' })
  const time = d.toLocaleString( [], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  return { date, day, month, time, year }
}
