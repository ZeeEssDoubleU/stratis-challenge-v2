import { AirDataForcasts_I, formatDate, getRelativeDay } from "../../utils"
import { capitalize } from "lodash"

// ************
// helper
// ************

export function whichDay(day: "yesterday" | "today" | "tomorrow") {
	if (day === "today") return "_isToday"
	else if (day === "yesterday") return "_isYesterday"
	else if (day === "tomorrow") return "_isTomorrow"
	else return false
}

// ************
// helper
// ************

export function filterForcastByDay(
	forecasts: AirDataForcasts_I["forecast"],
	relativeDay: "yesterday" | "today" | "tomorrow",
) {
	let filteredForecast = {} as {
		date: string
		relativeDay: string
		forecast: AirDataForcasts_I["forecast"]["daily"]
	}
	const allForecasts = forecasts.daily
	const allForecastsEntries = Object.entries(allForecasts)
	// get forecasts split by params (measurements)
	allForecastsEntries.forEach(([param, forecastsByDay]) => {
		forecastsByDay.filter((forecast) => {
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
				filteredForecast = {
					date: formatDate(date).formatted,
					relativeDay: capitalize(relativeDay),
					forecast: {
						...(filteredForecast.forecast as AirDataForcasts_I["forecast"]["daily"]),
						[param]: forecast,
					},
				}
			}
		})
	})

	return filteredForecast
}
