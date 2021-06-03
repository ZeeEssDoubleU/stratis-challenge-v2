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
export function getCity(cityArr: string[]) {
	return cityArr.length === 0
		? null
		: cityArr.length > 1
		? cityArr[cityArr.length - 2].trim()
		: cityArr[cityArr.length - 1].trim()
}

// ************
// selectors
// ************

export const selectAirDataState = (state: RootState_Type) => state.airData
export const selectAirDataLoading = (state: RootState_Type) =>
	state.airData.loading
export const selectSelectedLocation = (state: RootState_Type) =>
	state.airData.selectedLocation
export const selectSuccessfulSearches = (state: RootState_Type) =>
	state.airData.successfulSearches

/**
 * select correct location mapped to search param
 */
export const selectSearchLocation = (search: string) =>
	createSelector(
		selectAirDataState,
		(airDataState) => airDataState.searchMap[search],
	)

/**
 * select all AQI data
 */
export const selectAirDataByLocation = (search: string) =>
	createSelector(
		selectAirDataState,
		selectSearchLocation(search),
		(airDataState, location) => airDataState.airDataByLocation[location],
	)

/**
 * select current AQI data
 */
export const selectStationByLocation = (search: string) =>
	createSelector(selectAirDataByLocation(search), (airData) => {
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
export const selectTimeByLocation = (search: string) =>
	createSelector(selectAirDataByLocation(search), (airData) => {
		if (!airData) return null

		const { time } = airData

		return {
			time: formatDate(time.iso).formatted_time,
			date: formatDate(time.iso).formatted,
		}
	})
export const selectAQIByLocation = (search: string) =>
	createSelector(selectAirDataByLocation(search), (airData) => {
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
	search: string,
	selectedDay: RelativeDay,
) =>
	createSelector(selectAirDataByLocation(search), (airData) => {
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
export const selectForecastByLocationDayArray = (
	search: string,
	selectedDay: RelativeDay,
) =>
	createSelector(
		selectForecastByLocationDay(search, selectedDay),
		(forecast) => {
			if (!forecast) return null

			const targetDayForecastByArray = Object.entries(forecast)

			// [o3, pm10, pm25, uvi]
			return targetDayForecastByArray
		},
	)

/**
 * select keys to display in air data
 * ! not used
 */
export const selectForecastKeys = (search: string) =>
	createSelector(selectAirDataByLocation(search), (airData) => {
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

export function useAirDataSelectors() {
	return {
		// selectors
		airDataLoading: useReduxSelector(selectAirDataLoading),
		selectedLocation: useReduxSelector(selectSelectedLocation),
		successfulSearches: useReduxSelector(selectSuccessfulSearches),
		airDataByLocation: (search: string) =>
			useReduxSelector(selectAirDataByLocation(search)),
		// current AQI
		searchLocation: (search: string) =>
			useReduxSelector(selectSearchLocation(search)),
		stationByLocation: (search: string) =>
			useReduxSelector(selectStationByLocation(search)),
		timeByLocation: (search: string) =>
			useReduxSelector(selectTimeByLocation(search)),
		aqiByLocation: (search: string) =>
			useReduxSelector(selectAQIByLocation(search)),
		// forecasted AQI
		forecastByLocationDay: (search: string, selectedDay: string) =>
			useReduxSelector(selectForecastByLocationDay(search, selectedDay)),
		forecastByLocationDayArray: (search: string, selectedDay: string) =>
			useReduxSelector(
				selectForecastByLocationDayArray(search, selectedDay),
			),
	}
}
