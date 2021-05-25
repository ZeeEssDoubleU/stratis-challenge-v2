import {
	formatDate,
	formatParsedDate,
	getRelativeDay,
	SetAirDataByCoords,
} from "@utils"
import { startOfYesterday, startOfTomorrow, startOfToday } from "date-fns/esm"
import { capitalize } from "lodash"

// ************
// helper
// ************

/**
 * function returns ID that determins which method to use in getRelativeDay(parsedDate) function call
 * @param day "yesterday" | "today" | "tomorrow"
 * @returns "_isToday" | "_isYesterday" | "_isTomorrow"
 */
export function whichDay(day: "yesterday" | "today" | "tomorrow") {
	if (day === "today") return "_isToday"
	else if (day === "yesterday") return "_isYesterday"
	else if (day === "tomorrow") return "_isTomorrow"
	else return false
}

// ************
// helper
// ************

export type FilteredForecast = ReturnType<typeof filterForcastByDay>

/**
 * function filters all forecasts together on a selected day
 * @param forecasts forecast param from fetchAQI function return
 * @param relativeDay "yesterday" | "today" | "tomorrow"
 * @returns date, relativeDay, and a forecast for a selected day
 */
export function filterForcastByDay(
	forecasts: SetAirDataByCoords["forecast"],
	relativeDay: "yesterday" | "today" | "tomorrow",
) {
	const allForecasts = forecasts.daily
	type ForecastParams = keyof typeof allForecasts
	type Estimates = {
		avg: number
		day: string
		max: number
		min: number
	}
	type FilteredForecast<T> = {
		[K in T]: Estimates
	}

	/**
	 * filteredForecast is an object that returns forecasts for a given day
	 */
	const filteredForecast = Object.entries(allForecasts).reduce(
		(obj, [param, forecastsBydDay]) => {
			forecastsBydDay.filter((forecast) => {
				const { day: date } = forecast

				// parsed to ISO string
				const parsedDate = formatDate(date).parsed

				// determine method used in getRelativeDay(parsedDate)
				const selectedDay = whichDay(relativeDay)
				// see what day matches selected method
				const forecastMatchesSelected =
					selectedDay && getRelativeDay(parsedDate)[selectedDay]
				// if day passes method, add to filteredForecast object

				if (forecastMatchesSelected) {
					obj[param as string] = forecast
				}
			})

			return obj
		},
		{} as FilteredForecast<ForecastParams>,
	)

	const getDate = () => {
		if (relativeDay === "yesterday") {
			const date = startOfYesterday()
			return formatParsedDate(date).formatted
		} else if (relativeDay === "today") {
			const date = startOfToday()
			return formatParsedDate(date).formatted
		} else if (relativeDay === "tomorrow") {
			const date = startOfTomorrow()
			return formatParsedDate(date).formatted
		}
	}

	const filteredForecastWithDate = {
		date: getDate(),
		relativeDay: capitalize(relativeDay),
		...filteredForecast,
	}

	return filteredForecastWithDate
}
