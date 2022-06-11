import { useEffect, useRef } from 'react'
import { useJsApiLoader } from '@react-google-maps/api'
import { GOOGLE_MAPS_KEY } from '../utils/config'
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService'

function Map({ location }: { location: string | undefined }) {
	const googlemap = useRef(null)

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: GOOGLE_MAPS_KEY,
		version: 'weekly',
		libraries: ['drawing', 'places']
	})

	const { placesService, placePredictions, getPlacePredictions, isPlacePredictionsLoading } = usePlacesService({
		apiKey: GOOGLE_MAPS_KEY
	})

	useEffect(() => {
		if (!isLoaded) return

		const compute = async () => {
			let map
			const google = window.google
			map = new google.maps.Map(googlemap.current as any, {
				center: { lat: -34.397, lng: 150.644 },
				zoom: 8
			})

			if (location && placesService) {
				const getPlacesDetails = (placeId: string): Promise<{ lat: number; lng: number }> => {
					return new Promise((resolve, reject) => {
						placesService.getDetails({ placeId }, (result: google.maps.places.PlaceResult | null, status: google.maps.places.PlacesServiceStatus) => {
							if (status !== 'OK' || !result) {
								return reject('Eroare la google maps place details')
							}

							resolve({
								lat: Number(result.geometry?.location?.lat()),
								lng: Number(result.geometry?.location?.lng())
							})
						})
					})
				}
				const result = await getPlacesDetails(location)

				map = new google.maps.Map(googlemap.current as any, {
					center: { ...result },
					zoom: 20
				})
			}

			const drawingManager = new google.maps.drawing.DrawingManager({
				drawingMode: google.maps.drawing.OverlayType.MARKER,
				drawingControl: true,
				drawingControlOptions: {
					position: google.maps.ControlPosition.TOP_CENTER,
					drawingModes: [google.maps.drawing.OverlayType.MARKER, google.maps.drawing.OverlayType.CIRCLE, google.maps.drawing.OverlayType.POLYGON, google.maps.drawing.OverlayType.POLYLINE, google.maps.drawing.OverlayType.RECTANGLE]
				},
				markerOptions: {
					icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
				},
				circleOptions: {
					fillColor: '#ffff00',
					fillOpacity: 1,
					strokeWeight: 5,
					clickable: false,
					editable: true,
					zIndex: 1
				}
			})

			drawingManager.setMap(map)
		}

		compute()
	}, [isLoaded, location, placesService])
	return <div id="map" ref={googlemap} />
}
export default Map
