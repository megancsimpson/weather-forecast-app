function SearchBar({ city, onCityChange, onSearch, isLoading }) {
  return (
    <form className="search-form" onSubmit={onSearch}>
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
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  )
}

export default SearchBar