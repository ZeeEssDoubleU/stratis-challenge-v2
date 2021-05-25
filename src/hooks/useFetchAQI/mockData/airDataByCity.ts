export const airDataByCity = {
	data: {
		status: "ok",
		data: {
			aqi: 165,
			idx: 1437,
			attributions: [
				{
					url: "http://106.37.208.233:20035/emcpublish/",
					name: "China National Urban air quality real-time publishing platform (全国城市空气质量实时发布平台)",
				},
				{
					url: "https://china.usembassy-china.org.cn/embassy-consulates/shanghai/air-quality-monitor-stateair/",
					name: "U.S. Consulate Shanghai Air Quality Monitor",
				},
				{
					url: "https://sthj.sh.gov.cn/",
					name: "Shanghai Environment Monitoring Center(上海市环境监测中心)",
				},
				{
					url: "https://waqi.info/",
					name: "World Air Quality Index Project",
				},
			],
			city: {
				geo: [31.2047372, 121.4489017],
				name: "Shanghai (上海)",
				url: "https://aqicn.org/city/shanghai",
			},
			dominentpol: "pm25",
			iaqi: {
				co: {
					v: 8.4,
				},
				h: {
					v: 71.8,
				},
				no2: {
					v: 28.4,
				},
				o3: {
					v: 26,
				},
				p: {
					v: 1000,
				},
				pm10: {
					v: 70,
				},
				pm25: {
					v: 165,
				},
				so2: {
					v: 4.6,
				},
				t: {
					v: 25.8,
				},
				w: {
					v: 0.5,
				},
			},
			time: {
				s: "2021-05-25 09:00:00",
				tz: "+08:00",
				v: 1621933200,
				iso: "2021-05-25T09:00:00+08:00",
			},
			forecast: {
				daily: {
					o3: [
						{
							avg: 36,
							day: "2021-05-23",
							max: 44,
							min: 18,
						},
						{
							avg: 15,
							day: "2021-05-24",
							max: 43,
							min: 1,
						},
						{
							avg: 8,
							day: "2021-05-25",
							max: 33,
							min: 1,
						},
						{
							avg: 6,
							day: "2021-05-26",
							max: 11,
							min: 1,
						},
					],
					pm10: [
						{
							avg: 46,
							day: "2021-05-23",
							max: 54,
							min: 33,
						},
						{
							avg: 90,
							day: "2021-05-24",
							max: 115,
							min: 57,
						},
						{
							avg: 122,
							day: "2021-05-25",
							max: 122,
							min: 122,
						},
						{
							avg: 102,
							day: "2021-05-26",
							max: 122,
							min: 57,
						},
						{
							avg: 93,
							day: "2021-05-27",
							max: 156,
							min: 47,
						},
						{
							avg: 173,
							day: "2021-05-28",
							max: 173,
							min: 173,
						},
					],
					pm25: [
						{
							avg: 123,
							day: "2021-05-23",
							max: 137,
							min: 89,
						},
						{
							avg: 177,
							day: "2021-05-24",
							max: 206,
							min: 145,
						},
						{
							avg: 205,
							day: "2021-05-25",
							max: 246,
							min: 173,
						},
						{
							avg: 184,
							day: "2021-05-26",
							max: 237,
							min: 144,
						},
						{
							avg: 177,
							day: "2021-05-27",
							max: 237,
							min: 137,
						},
						{
							avg: 199,
							day: "2021-05-28",
							max: 233,
							min: 173,
						},
					],
					uvi: [
						{
							avg: 1,
							day: "2021-05-23",
							max: 3,
							min: 0,
						},
						{
							avg: 2,
							day: "2021-05-24",
							max: 8,
							min: 0,
						},
						{
							avg: 1,
							day: "2021-05-25",
							max: 6,
							min: 0,
						},
						{
							avg: 0,
							day: "2021-05-26",
							max: 2,
							min: 0,
						},
						{
							avg: 1,
							day: "2021-05-27",
							max: 2,
							min: 0,
						},
					],
				},
			},
			debug: {
				sync: "2021-05-25T10:19:02+09:00",
			},
		},
	},
}
