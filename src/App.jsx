import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
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
          <button type="submit">Search</button>
        </form>

        <div className="empty-state" aria-live="polite">
          <span className="empty-state__icon" aria-hidden="true">?</span>
          <p>Search for a city to view the weather.</p>
        </div>
      </section>
    </main>
  )
}

export default App
