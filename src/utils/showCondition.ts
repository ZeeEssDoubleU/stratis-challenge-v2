// ************
// helper
// ************

export function showCondition(value: number) {
	switch (true) {
		case value <= 50:
			return {
				condition: "healthy",
				color: "#009966",
				implications:
					"Air quality is considered satisfactory, and air pollution poses little or no risk",
				caution:
					"Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion.",
			}
		case value <= 100:
			return {
				condition: "moderate",
				color: "#FFDE32",
				implications:
					"Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.",
				caution:
					"Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion.",
			}
		case value <= 150:
			return {
				condition: "unhealthy for sensitive groups",
				color: "#FF9933",
				implications:
					"Members of sensitive groups may experience health effects. The general public is not likely to be affected.",
				caution:
					"Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion.",
			}
		case value <= 200:
			return {
				condition: "unhealthy",
				color: "#CC0033",
				implications:
					"Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.",
				caution:
					"Active children and adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else, especially children, should limit prolonged outdoor exertion.",
			}
		case value <= 250:
			return {
				condition: "very unhealthy",
				color: "#660199",
				implications:
					"Health warnings of emergency conditions. The entire population is more likely to be affected.",
				caution:
					"Active children and adults, and people with respiratory disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should limit outdoor exertion.",
			}
		default:
			return {
				condition: "hazardous",
				color: "#7E0023",
				implications:
					"Health alert: everyone may experience more serious health effects.",
				caution: "Everyone should avoid all outdoor exertion.",
			}
	}
}
