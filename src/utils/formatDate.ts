import { format, isToday, isTomorrow, isYesterday, parseISO } from "date-fns"

// ************
// types
// ************

export type FormatDate = ReturnType<typeof formatDate>
export type GetRelativeDay = ReturnType<typeof getRelativeDay>

// ************
// functions
// ************

/**
 *	formats an ISO date string
 * @param date string
 * @returns an object of various formats
 */
export function formatDate(date: string) {
	const parsed = parseISO(date)
	const formatted = format(parsed, "MMMM d")
	const formatted_time = format(parsed, "p")

	return { parsed, formatted, formatted_time }
}

export function formatParsedDate(date: Date) {
	const formatted = format(date, "MMMM d")
	const formatted_time = format(date, "p")

	return { formatted, formatted_time }
}

/**
 * determines if input day is yesterday, today, or tomorrow
 * @param parsed Date
 * @returns an object of booleans to determine input day relative to today
 */
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
