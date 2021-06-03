import {
    format, isToday, isTomorrow, isYesterday, parseISO, startOfToday,
    startOfTomorrow, startOfYesterday
} from 'date-fns';

// ************
// types
// ************

export type RelativeDay = "yesterday" | "today" | "tomorrow"
export type FormatDate = ReturnType<typeof formatDate>
export type FormatParsedDate = ReturnType<typeof formatParsedDate>
export type GetRelativeDay = ReturnType<typeof getRelativeDay>
export type IsDay = ReturnType<typeof isDay>
export type GetFormattedDate = ReturnType<typeof getFormattedDate>

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
 * @typedef {Object} isDay
 * @property {boolean} today - checks if date given is today
 * @property {boolean} yesterday - checks if date given is yesterday
 * @property {boolean} tomorrow - checks if date given is tomorrow
 */
/**
 * determines if input day is yesterday, today, or tomorrow
 * @param {Date} date
 * @returns {isDay} an object of booleans checking if given date is equal to relative date
 */
export function isDay(parsed: Date) {
	return {
		today: isToday(parsed),
		yesterday: isYesterday(parsed),
		tomorrow: isTomorrow(parsed),
	}
}

/**
 * formats ISO parsed date into a short human friendly string
 * @param {string} relativeDay
 * @returns {string} a date formatted to month and day (ie March 25)
 */
export function getFormattedDate(relativeDay: RelativeDay) {
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
