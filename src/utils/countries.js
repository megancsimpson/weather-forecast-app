const countryCodes = {
  canada: 'CA',
  ca: 'CA',
  'united states': 'US',
  usa: 'US',
  us: 'US',
  'united kingdom': 'GB',
  uk: 'GB',
  gb: 'GB',
  australia: 'AU',
  au: 'AU',
  france: 'FR',
  fr: 'FR',
  germany: 'DE',
  de: 'DE',
  mexico: 'MX',
  mx: 'MX',
  japan: 'JP',
  jp: 'JP',
  india: 'IN',
  in: 'IN',
  italy: 'IT',
  it: 'IT',
  spain: 'ES',
  es: 'ES',
  brazil: 'BR',
  br: 'BR',
}

export function getCountryCode(country) {
  const normalizedCountry = country.trim().toLowerCase()

  if (/^[a-z]{2}$/.test(normalizedCountry)) {
    return normalizedCountry.toUpperCase()
  }

  return countryCodes[normalizedCountry] || null
}