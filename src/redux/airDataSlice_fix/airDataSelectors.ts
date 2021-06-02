import { capitalize } from 'lodash';
import { createSelector } from 'reselect';

import { formatDate, getFormattedDate, isDay, RelativeDay } from '../../utils';
import { RootState_Type, useReduxSelector } from '../store';

// ************
// selectors
// ************

export const airDataState = (state: RootState_Type) => state.airData_fix
export const selectLoading = createSelector(
	airDataState,
	(airData) => airData.loading,
)
export const selectCurrentLocation = createSelector(
	airDataState,
	(airData) => airData.currentLocation,
)
/**
 * select all AQI data
 */
export const selectAirDataByLocation = (location: string) =>
	createSelector(
		airDataState,
		(airData) => airData.airDataByLocation[location],
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
			station:
				cityArr.length > 2 ? cityArr[cityArr.length - 3].trim() : null,
			stationId: idx,
			city:
				cityArr.length > 1
					? cityArr[cityArr.length - 2].trim()
					: cityArr[cityArr.length - 1].trim(),
			state: cityArr.length > 1 ? cityArr[cityArr.length - 1].trim() : null,
		}
	})
export const selectTimeByLocation = (location: string) =>
	createSelector(selectAirDataByLocation(location), (airData) => {
		const { time } = airData

		return {
			time: time?.iso && formatDate(time.iso).formatted_time,
			date: time?.iso && formatDate(time.iso).formatted,
		}
	})
export const selectAQIByLocation = (location: string) =>
	createSelector(selectAirDataByLocation(location), (airData) => {
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

		if (filteredForecast) {
			filteredForecast["date"] = getFormattedDate(selectedDay)
			filteredForecast["relativeDay"] = capitalize(selectedDay)
		}
		return filteredForecast as {
			date: string
			relativeDay: string
		} & ForecastsByParam
	})

// ************
// hook
// ************

export function useAirDataSelectors_fix() {
	return {
		// selectors
		airDataLoading: useReduxSelector(selectLoading),
		currentLocation: useReduxSelector(selectCurrentLocation),
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
		yesterdayForecast: (location) =>
			useReduxSelector(selectForecastByLocationDay(location, "yesterday")),
		todayForecast: (location) =>
			useReduxSelector(selectForecastByLocationDay(location, "today")),
		tomorrowForecast: (location) =>
			useReduxSelector(selectForecastByLocationDay(location, "tomorrow")),
	}
}
