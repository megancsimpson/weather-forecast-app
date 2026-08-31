function Forecast({ forecast, timezone, unit, formatTemperature, isLoading, error }) {
  return (
    <section className="forecast-section" aria-labelledby="forecast-title">
      <h2 id="forecast-title">5-Day Forecast</h2>

      {isLoading && (
        <p className="status-message">Loading the five-day forecast...</p>
      )}

      {!isLoading && error && (
        <p className="status-message status-message--error">{error}</p>
      )}

      {!isLoading && !error && forecast.length > 0 && (
        <div className="forecast-grid">
          {forecast.map((day) => (
            <article className="forecast-card" key={day.dt}>
              <h3>
                {new Date((day.dt + timezone) * 1000).toLocaleDateString(
                  'en-US',
                  { weekday: 'short', timeZone: 'UTC' },
                )}
              </h3>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
              />
              <p className="forecast-card__description">{day.weather[0].description}</p>
              <p className="forecast-card__temperature">
                {formatTemperature(day.main.temp, unit)}
              </p>
              <p className="forecast-card__detail">Humidity {day.main.humidity}%</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Forecast