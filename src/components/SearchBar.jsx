function SearchBar({ city, country, onCityChange, onCountryChange, onSearch, isLoading }) {
  return (
    <form className="search-form" onSubmit={onSearch}>
      <div className="search-field">
        <label className="sr-only" htmlFor="city">
          City name
        </label>
        <input
          id="city"
          name="city"
          type="text"
          placeholder="Enter a city name"
          value={city}
          onChange={(event) => onCityChange(event.target.value)}
        />
      </div>
      <div className="search-field">
        <label htmlFor="country">Country (optional)</label>
        <input
          id="country"
          name="country"
          type="text"
          placeholder="Canada, United Kingdom, or CA"
          value={country}
          onChange={(event) => onCountryChange(event.target.value)}
        />
        <p>Enter a country name or two-letter code.</p>
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  )
}

export default SearchBar