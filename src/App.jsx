import { useState } from 'react'
import CurrentWeather from './components/CurrentWeather.jsx'
import Forecast from './components/Forecast.jsx'
import SearchBar from './components/SearchBar.jsx'
import './App.css'

function getDailyForecast(forecastList, timezoneOffset) {
  const forecastsByDay = {}

  forecastList.forEach((forecast) => {
    const localDate = new Date((forecast.dt + timezoneOffset) * 1000)
    const dayKey = localDate.toISOString().slice(0, 10)
    const hoursFromNoon = Math.abs(localDate.getUTCHours() - 12)

    if (!forecastsByDay[dayKey] || hoursFromNoon < forecastsByDay[dayKey].hoursFromNoon) {
      forecastsByDay[dayKey] = { forecast, hoursFromNoon }
    }
  })

  return Object.values(forecastsByDay)
    .slice(0, 5)
    .map(({ forecast }) => forecast)
}

function formatTemperature(celsius, unit) {
  const temperature = unit === 'fahrenheit'
    ? (celsius * 9) / 5 + 32
    : celsius
  const symbol = unit === 'fahrenheit' ? 'F' : 'C'

  return `${Math.round(temperature)}°${symbol}`
}

function App() {
  const [city, setCity] = useState('')
  const [unit, setUnit] = useState('celsius')
  const [weather, setWeather] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [forecast, setForecast] = useState([])
  const [isForecastLoading, setIsForecastLoading] = useState(false)
  const [forecastError, setForecastError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    const cityName = city.trim()

    if (!cityName) {
      setError('Enter a city name to see its weather.')
      return
    }

    setIsLoading(true)
    setError('')
    setForecast([])
    setForecastError('')

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`,
      )

      if (response.status === 404) {
        setError(`We could not find "${cityName}". Check the spelling and try again.`)
        return
      }

      if (!response.ok) {
        throw new Error('Weather request failed')
      }

      const weatherData = await response.json()
      setWeather(weatherData)
      setIsLoading(false)
      setIsForecastLoading(true)

      try {
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`,
        )

        if (!forecastResponse.ok) {
          throw new Error('Forecast request failed')
        }

        const forecastData = await forecastResponse.json()
        setForecast(getDailyForecast(forecastData.list, forecastData.city.timezone))
      } catch {
        setForecastError('The five-day forecast is unavailable right now. Please try again later.')
      } finally {
        setIsForecastLoading(false)
      }
    } catch {
      setError('Weather is unavailable right now. Please try again in a moment.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="weather-app">
      <div className="weather-app__sky" aria-hidden="true">
        <span className="cloud cloud--one"></span>
        <span className="cloud cloud--two"></span>
        <span className="sun"></span>
      </div>

      <section className="weather-card" aria-labelledby="weather-title">
        <div className="weather-icon" aria-hidden="true">
          <span className="weather-icon__sun"></span>
          <span className="weather-icon__cloud"></span>
        </div>
        <p className="eyebrow">Your daily outlook</p>
        <h1 id="weather-title">Weather Forecast</h1>
        <p className="intro">
          Search any city to see its current conditions and forecast.
        </p>

        <SearchBar
          city={city}
          onCityChange={setCity}
          onSearch={handleSubmit}
          isLoading={isLoading}
        />

        <div className="weather-result" aria-live="polite">
          {isLoading && <p className="status-message">Finding the latest weather...</p>}

          {!isLoading && error && <p className="status-message status-message--error">{error}</p>}

          {!isLoading && !error && !weather && (
            <div className="empty-state">
              <span className="empty-state__icon" aria-hidden="true">?</span>
              <p>Search for a city to view the weather.</p>
            </div>
          )}

          {!isLoading && weather && (
            <CurrentWeather
              weather={weather}
              unit={unit}
              onUnitChange={setUnit}
              formatTemperature={formatTemperature}
            />
          )}

          {!isLoading && weather && (
            <Forecast
              forecast={forecast}
              timezone={weather.timezone}
              unit={unit}
              formatTemperature={formatTemperature}
              isLoading={isForecastLoading}
              error={forecastError}
            />
          )}
        </div>
      </section>
    </main>
  )
}

export default App
