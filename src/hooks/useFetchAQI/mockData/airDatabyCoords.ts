export const airDatabyCoords = {
	data: {
		status: "ok",
		data: {
			aqi: 28,
			idx: 3900,
			attributions: [
				{
					url: "http://www.arb.ca.gov/",
					name: "CARB - California Air Resources Board",
					logo: "USA-CAARB.png",
				},
				{
					url: "http://www.airnow.gov/",
					name: "Air Now - US EPA",
				},
				{
					url: "https://waqi.info/",
					name: "World Air Quality Index Project",
				},
			],
			city: {
				geo: [37.76595, -122.39902],
				name: "San Francisco-Arkansas Street, San Francisco, California",
				url: "https://aqicn.org/city/california/san-francisco/san-francisco-arkansas-street",
			},
			dominentpol: "o3",
			iaqi: {
				co: {
					v: 1.9,
				},
				h: {
					v: 77,
				},
				no2: {
					v: 1.9,
				},
				o3: {
					v: 28.1,
				},
				p: {
					v: 1019.5,
				},
				pm25: {
					v: 13,
				},
				t: {
					v: 14.6,
				},
				w: {
					v: 6.7,
				},
				wg: {
					v: 15.6,
				},
			},
			time: {
				s: "2021-05-24 16:00:00",
				tz: "-07:00",
				v: 1621872000,
				iso: "2021-05-24T16:00:00-07:00",
			},
			forecast: {
				daily: {
					o3: [
						{
							avg: 30,
							day: "2021-05-22",
							max: 41,
							min: 20,
						},
						{
							avg: 34,
							day: "2021-05-23",
							max: 42,
							min: 26,
						},
						{
							avg: 23,
							day: "2021-05-24",
							max: 44,
							min: 14,
						},
						{
							avg: 29,
							day: "2021-05-25",
							max: 41,
							min: 24,
						},
					],
					pm10: [
						{
							avg: 10,
							day: "2021-05-22",
							max: 11,
							min: 8,
						},
						{
							avg: 7,
							day: "2021-05-23",
							max: 11,
							min: 4,
						},
						{
							avg: 7,
							day: "2021-05-24",
							max: 12,
							min: 4,
						},
						{
							avg: 4,
							day: "2021-05-25",
							max: 8,
							min: 3,
						},
					],
					pm25: [
						{
							avg: 19,
							day: "2021-05-22",
							max: 23,
							min: 17,
						},
						{
							avg: 12,
							day: "2021-05-23",
							max: 18,
							min: 8,
						},
						{
							avg: 15,
							day: "2021-05-24",
							max: 36,
							min: 6,
						},
						{
							avg: 9,
							day: "2021-05-25",
							max: 11,
							min: 4,
						},
					],
					uvi: [
						{
							avg: 1,
							day: "2021-05-22",
							max: 6,
							min: 0,
						},
						{
							avg: 1,
							day: "2021-05-23",
							max: 7,
							min: 0,
						},
						{
							avg: 1,
							day: "2021-05-24",
							max: 9,
							min: 0,
						},
						{
							avg: 1,
							day: "2021-05-25",
							max: 9,
							min: 0,
						},
						{
							avg: 2,
							day: "2021-05-26",
							max: 9,
							min: 0,
						},
					],
				},
			},
			debug: {
				sync: "2021-05-25T09:48:48+09:00",
			},
		},
	},
}
