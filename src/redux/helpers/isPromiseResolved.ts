// ************
// helper
// ************

export function isResolved(arg: string): Promise<number> {
	return new Promise<number>((resolve, reject) => {
		if (arg === "a") {
			resolve(1)
		} else {
			reject("1")
		}
	})
}
