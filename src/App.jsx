import { useState } from 'react'
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

function App() {
  const [city, setCity] = useState('')
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

        <form className="search-form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="city">
            City name
          </label>
          <input
            id="city"
            name="city"
            type="text"
            placeholder="Enter a city name"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>

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
            <section className="conditions" aria-label="Current weather">
              <div className="conditions__heading">
                <div>
                  <h2>{weather.name}, {weather.sys.country}</h2>
                  <p>{weather.weather[0].description}</p>
                </div>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
              </div>
              <p className="temperature">{Math.round(weather.main.temp)}&deg;C</p>
              <div className="weather-details">
                <p><span>Feels like</span>{Math.round(weather.main.feels_like)}&deg;C</p>
                <p><span>Humidity</span>{weather.main.humidity}%</p>
                <p><span>Wind speed</span>{weather.wind.speed} m/s</p>
              </div>
            </section>
          )}

          {!isLoading && weather && (
            <section className="forecast-section" aria-labelledby="forecast-title">
              <h2 id="forecast-title">5-Day Forecast</h2>

              {isForecastLoading && (
                <p className="status-message">Loading the five-day forecast...</p>
              )}

              {!isForecastLoading && forecastError && (
                <p className="status-message status-message--error">{forecastError}</p>
              )}

              {!isForecastLoading && !forecastError && forecast.length > 0 && (
                <div className="forecast-grid">
                  {forecast.map((day) => (
                    <article className="forecast-card" key={day.dt}>
                      <h3>
                        {new Date((day.dt + weather.timezone) * 1000).toLocaleDateString(
                          'en-US',
                          { weekday: 'short', timeZone: 'UTC' },
                        )}
                      </h3>
                      <img
                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                        alt={day.weather[0].description}
                      />
                      <p className="forecast-card__description">{day.weather[0].description}</p>
                      <p className="forecast-card__temperature">{Math.round(day.main.temp)}&deg;C</p>
                      <p className="forecast-card__detail">Humidity {day.main.humidity}%</p>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </section>
    </main>
  )
}

export default App
