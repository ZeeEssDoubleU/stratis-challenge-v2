import {
	AirDataDailyForecasts_I,
	AirDataForecast_I,
	formatForecastDate,
} from "../../utils"
import { DailyMeasurementsWithDate_I } from "../slices/reduxAirDataSlice"
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
	forecast: AirDataForecast_I,
	relativeDay: "yesterday" | "today" | "tomorrow",
): DailyMeasurementsWithDate_I {
	// function determines which date method to use from formatForecastDate function below

	// get key value pairs of each forecast day
	return Object.entries(forecast.daily).reduce(
		// create single day forecast object (ie yesterday, today, tomorrow)
		(
			filteredObject,
			[key, dailyForecasts]: [string, AirDataDailyForecasts_I],
		) => {
			// filter only selected days measurements into object
			dailyForecasts.filter((dailyRecord) => {
				const { day: date } = dailyRecord

				// ! type guarded to prevent false index error below at else if
				if (whichDay(relativeDay) === false) {
					return filteredObject
				} else if (
					// whichDay function picks index that chooses which day to filter on
					formatForecastDate(date)[
						whichDay(relativeDay) as
							| "_isToday"
							| "_isYesterday"
							| "_isTomorrow"
					]
				) {
					filteredObject = {
						["date"]: formatForecastDate(date).formatted,
						["relativeDay"]: capitalize(relativeDay),
						[key]: dailyRecord,
					}
				}
			})

			return filteredObject
		},
		{}, // create empty filteredObject
	)
}
