import UnitToggle from './UnitToggle.jsx'

function CurrentWeather({ weather, unit, onUnitChange, formatTemperature }) {
  return (
    <section className="conditions" aria-label="Current weather">
      <UnitToggle unit={unit} onUnitChange={onUnitChange} />
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
      <p className="temperature">{formatTemperature(weather.main.temp, unit)}</p>
      <div className="weather-details">
        <p><span>Feels like</span>{formatTemperature(weather.main.feels_like, unit)}</p>
        <p><span>Humidity</span>{weather.main.humidity}%</p>
        <p><span>Wind speed</span>{weather.wind.speed} m/s</p>
      </div>
    </section>
  )
}

export default CurrentWeather