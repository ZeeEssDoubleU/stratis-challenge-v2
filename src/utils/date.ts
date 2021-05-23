import { isToday, isTomorrow, isYesterday, parseISO, format } from "date-fns"

// ************
// types
// ************

// ! created to use in reduxAirDataSlice
export interface CurrentDate_I {
	parsed: Date
	formatted: string
	formatted_time: string
}
export interface FormatForecastDate_I {
	parsed: Date
	formatted: string
	formatted_time: string
	_isToday: boolean
	_isYesterday: boolean
	_isTomorrow: boolean
}

// ************
// functions
// ************

export function formatDate(date: string) {
	const parsed = parseISO(date)
	const formatted = format(parsed, "MMMM d")
	const formatted_time = format(parsed, "p")

	return { parsed, formatted, formatted_time }
}

// parse and format current date
export function formatCurrentDate(date: string): CurrentDate_I {
	const { parsed, formatted, formatted_time } = formatDate(date)
	return { parsed, formatted, formatted_time }
}

// parse and format forecast date
export function formatForecastDate(date: string): FormatForecastDate_I {
	const { parsed, formatted, formatted_time } = formatDate(date)
	const _isToday = isToday(parsed)
	const _isYesterday = isYesterday(parsed)
	const _isTomorrow = isTomorrow(parsed)

	return {
		parsed,
		formatted,
		formatted_time,
		_isToday,
		_isYesterday,
		_isTomorrow,
	}
}
