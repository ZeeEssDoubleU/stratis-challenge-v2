import { isToday, isTomorrow, isYesterday, parseISO, format } from "date-fns"

// ************
// types
// ************

// ! created to use in reduxAirDataSlice
export interface FormatDate_I {
	parsed: Date
	formatted: string
	formatted_time: string
}
export interface GetRelativeDay_I {
	_isToday: boolean
	_isYesterday: boolean
	_isTomorrow: boolean
}

// ************
// functions
// ************

// format date from iso string
export function formatDate(date: string) {
	const parsed = parseISO(date)
	const formatted = format(parsed, "MMMM d")
	const formatted_time = format(parsed, "p")

	return { parsed, formatted, formatted_time }
}

// determine is day is yesterday, today or tomorrow
export function getRelativeDay(parsed: Date) {
	const _isToday = isToday(parsed)
	const _isYesterday = isYesterday(parsed)
	const _isTomorrow = isTomorrow(parsed)

	return {
		_isToday,
		_isYesterday,
		_isTomorrow,
	}
}
