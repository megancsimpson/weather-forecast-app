# Weather Forecast App

A React and Vite weather application that fetches live current weather and five-day forecast data from the OpenWeatherMap API. Users can search for a city, optionally narrow the search by country, and switch between Celsius and Fahrenheit displays.

## Features

- Search by city
- Optional country search using either a country name or two-letter country code
- Current weather display with temperature, feels-like temperature, weather description and icon, humidity, and wind speed
- Five-day forecast
- Celsius/Fahrenheit temperature toggle
- Responsive weather-themed interface
- Loading feedback while weather and forecast data are requested
- Friendly error messages for blank input, invalid city, invalid country name, city/country mismatch, and failed API requests

## Technologies Used

- React
- Vite
- JavaScript
- CSS
- OpenWeatherMap API
- Git and GitHub

## Getting Started

1. Clone the repository.

	```bash
	git clone <repository-url>
	```

2. Enter the project folder.

	```bash
	cd weather-forecast-app
	```

3. Install the project dependencies.

	```bash
	npm install
	```

4. Create a `.env` file in the project root.

5. Add your OpenWeatherMap API key to the `.env` file.

	```env
	VITE_OPENWEATHER_API_KEY=your_openweathermap_api_key_here
	```

6. Start the development server.

	```bash
	npm run dev
	```

7. Open the local URL shown in the terminal, usually `http://localhost:5173`.

Do not commit `.env` to GitHub. Your actual API key must never be shared or included in source code, screenshots, or documentation.

## Available Scripts

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Creates an optimized production build in the `dist` folder.

## Project Structure

```text
weather-forecast-app/
├── public/                    # Public files served directly by Vite
├── src/
│   ├── assets/                # Project image and visual assets
│   ├── components/
│   │   ├── CurrentWeather.jsx # Displays current weather details and icon
│   │   ├── Forecast.jsx       # Displays five-day forecast cards and feedback
│   │   ├── SearchBar.jsx      # City and optional country search fields
│   │   └── UnitToggle.jsx     # Celsius/Fahrenheit toggle control
│   ├── utils/
│   │   └── countries.js       # Converts supported country names and aliases to codes
│   ├── App.css                # Weather app layout and responsive component styles
│   ├── App.jsx                # App state, API requests, error handling, and component wiring
│   ├── index.css              # Global styles and reset rules
│   └── main.jsx               # React application entry point
├── .env                       # Local API key configuration; do not commit
├── package.json               # Project scripts and dependencies
└── vite.config.js             # Vite configuration
```

## API

The app uses the OpenWeatherMap API for current weather conditions and the five-day forecast. Weather requests use the selected city and, when provided, a resolved two-letter country code.

## Live Demo

Deployment link: Coming soon

## Author

Your Name
