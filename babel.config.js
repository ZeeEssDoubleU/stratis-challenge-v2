module.exports = function (api) {
	api.cache(true)
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			// https://www.npmjs.com/package/react-native-dotenv
			[
				"module:react-native-dotenv",
				{
					moduleName: "react-native-dotenv",
				},
			],
			"react-native-reanimated/plugin",
		],
	}
}
