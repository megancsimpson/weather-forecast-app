function Footer() {
  return (
    <footer className="app-footer">
      <p>© 2026 Megan Simpson</p>
      <p>Software Development Student</p>
      <p>Built with React, Vite, CSS, and the OpenWeatherMap API</p>
      <p>
        Weather data provided by{' '}
        <a
          href="https://openweathermap.org/"
          target="_blank"
          rel="noreferrer"
        >
          OpenWeather
        </a>
      </p>
      <a
        href="https://www.linkedin.com/in/megancsimpson"
        target="_blank"
        rel="noreferrer"
      >
        LinkedIn
      </a>
      <a
        href="https://github.com/megancsimpson/weather-forecast-app"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
    </footer>
  )
}

export default Footer