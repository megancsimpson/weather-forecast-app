import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    const cityName = city.trim()

    if (!cityName) {
      setError('Enter a city name to see its weather.')
      return
    }

    setIsLoading(true)
    setError('')

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
        </div>
      </section>
    </main>
  )
}

export default App
