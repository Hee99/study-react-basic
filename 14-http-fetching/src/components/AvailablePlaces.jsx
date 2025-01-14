import { useState, useEffect } from 'react'

import Places from './Places.jsx'
import ErrorPage from './Error.jsx'
import { sortPlacesByDistance } from '../loc.js'
import { fetchAvaliablePlaces } from '../http.js'

export default function AvailablePlaces({ onSelectPlace }) {
  const [avaliablePlaces, setAvaliablePlaces] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    async function fetchPlaces() {
      setIsLoading(true)
      try {
        const places = await fetchAvaliablePlaces()

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude,
          )
          setIsLoading(false)
          setAvaliablePlaces(sortedPlaces)
        })
      } catch (error) {
        setError({
          message:
            error.message || 'Could not fetch places, please try again later.',
        })
        setIsLoading(false)
      }
    }

    fetchPlaces()
  }, [])

  if (error) {
    return <ErrorPage title="An error occurred!" message={error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={avaliablePlaces}
      isLoading={isLoading}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  )
}
