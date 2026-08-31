function UnitToggle({ unit, onUnitChange }) {
  return (
    <div className="unit-toggle" role="group" aria-label="Temperature unit">
      <button
        type="button"
        className={unit === 'celsius' ? 'unit-toggle__button unit-toggle__button--active' : 'unit-toggle__button'}
        aria-pressed={unit === 'celsius'}
        onClick={() => onUnitChange('celsius')}
      >
        °C
      </button>
      <button
        type="button"
        className={unit === 'fahrenheit' ? 'unit-toggle__button unit-toggle__button--active' : 'unit-toggle__button'}
        aria-pressed={unit === 'fahrenheit'}
        onClick={() => onUnitChange('fahrenheit')}
      >
        °F
      </button>
    </div>
  )
}

export default UnitToggle