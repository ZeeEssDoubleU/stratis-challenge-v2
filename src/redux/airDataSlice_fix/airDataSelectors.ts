import { createSelector } from 'reselect';

import { formatDate, isDay, RelativeDay } from '../../utils';
import { RootState_Type, useReduxSelector } from '../store';

// ************
// helpers
// ************

/**
 * returns formatted city name
 * @param {array} cityArr - city array derived from city string separated by comma
 * @returns {string} city name
 */
export function getCity(cityArr) {
	return cityArr.length === 0
		? null
		: cityArr.length > 1
		? cityArr[cityArr.length - 2].trim()
		: cityArr[cityArr.length - 1].trim()
}

// ************
// selectors
// ************

export const selectAirDataState = (state: RootState_Type) => state.airData_fix
export const selectAirDataLoading = (state: RootState_Type) =>
	state.airData_fix.loading
export const selectCurrentLocation = (state: RootState_Type) =>
	state.airData_fix.currentLocation
export const selectAllLocations = (state: RootState_Type) =>
	state.airData_fix.allLocations

/**
 * select all AQI data
 */
export const selectAirDataByLocation = (location: string) =>
	createSelector(
		selectAirDataState,
		(airDataState) => airDataState.airDataByLocation[location],
	)

/**
 * select current AQI data
 */
export const selectStationByLocation = (location: string) =>
	createSelector(selectAirDataByLocation(location), (airData) => {
		if (!airData) return null

		const { city: cityObj, idx } = airData
		const cityArr = cityObj.name.split(",")

		return {
			full: cityObj.name,
			station:
				cityArr.length > 2 ? cityArr[cityArr.length - 3].trim() : null,
			stationId: idx,
			city: getCity(cityArr),
			state: cityArr.length > 1 ? cityArr[cityArr.length - 1].trim() : null,
		}
	})
export const selectTimeByLocation = (location: string) =>
	createSelector(selectAirDataByLocation(location), (airData) => {
		if (!airData) return null

		const { time } = airData

		return {
			time: formatDate(time.iso).formatted_time,
			date: formatDate(time.iso).formatted,
		}
	})
export const selectAQIByLocation = (location: string) =>
	createSelector(selectAirDataByLocation(location), (airData) => {
		if (!airData) return null

		const { aqi, dominentpol, iaqi } = airData

		return {
			aqi,
			dominentpol,
			iaqi: Object.entries(iaqi).reduce((obj, [key, value]) => {
				obj[key] = value.v
				return obj
			}, {} as { [param: string]: number }),
		}
	})

/**
 * select AQI forecasts
 */
export const selectForecastByLocationDay = (
	location: string,
	selectedDay: RelativeDay,
) =>
	createSelector(selectAirDataByLocation(location), (airData) => {
		if (!airData) return null

		const allForecasts = airData?.forecast.daily

		type Values<T> = T[keyof T]
		type Forecast = Values<typeof allForecasts>[0]
		type ForecastsByParam = {
			[param: string]: Forecast
		}

		const filteredForecast =
			allForecasts &&
			Object.entries(allForecasts).reduce((obj, [param, dailyForecasts]) => {
				dailyForecasts.filter((forecast) => {
					const { day: date } = forecast

					// parsed to ISO string
					const parsedDate = formatDate(date).parsed

					// see if parsed day matches relativeDay
					const forecastMatchesSelected =
						selectedDay && isDay(parsedDate)[selectedDay]

					// if day matches, add day's forecast filteredForecast object
					if (forecastMatchesSelected) {
						obj[param] = forecast
					}
				})

				return obj as ForecastsByParam
			}, {})

		return filteredForecast as ForecastsByParam
	})

/**
 * select AQI forecasts by param on selected location and day
 */
export const selectForecastByLocationDayParam = (
	location: string,
	selectedDay: RelativeDay,
) =>
	createSelector(
		selectForecastByLocationDay(location, selectedDay),
		(forecast) => {
			// if (!forecast) return null

			const targetDayForecastByParam = Object.entries(forecast).filter(
				([param, estimate]) => {
					estimate !== undefined
				},
			)
			// [o3, pm10, pm25, uvi]
			return targetDayForecastByParam
		},
	)

/**
 * select keys to display in air data
 * ! not used
 */
export const selectForecastKeys = (location: string) =>
	createSelector(selectAirDataByLocation(location), (airData) => {
		if (!airData) return null

		const allForecasts = airData?.forecast.daily

		let displayKeys = {}
		for (prop in allForecasts) {
			displayKeys = Object.keys(allForecasts[prop][0])
				.filter((key) => key !== "day")
				.push("")
				.sort((a, b) => a[0] - b[0])

			break
		}

		return displayKeys
	})

// ************
// hook
// ************

export function useAirDataSelectors_fix() {
	return {
		// selectors
		airDataLoading: useReduxSelector(selectAirDataLoading),
		currentLocation: useReduxSelector(selectCurrentLocation),
		allLocations: useReduxSelector(selectAllLocations),
		airDataByLocation: (location) =>
			useReduxSelector(selectAirDataByLocation(location)),
		// current AQI
		stationByLocation: (location) =>
			useReduxSelector(selectStationByLocation(location)),
		timeByLocation: (location) =>
			useReduxSelector(selectTimeByLocation(location)),
		aqiByLocation: (location) =>
			useReduxSelector(selectAQIByLocation(location)),
		// forecasted AQI
		forecastByLocationDay: (location, selectedDay) =>
			useReduxSelector(selectForecastByLocationDay(location, selectedDay)),
		forecastByLocationDayParam: (location, selectedDay) =>
			useReduxSelector(
				selectForecastByLocationDayParam(location, selectedDay),
			),
	}
}
