module.exports = function (api) {
	api.cache(true)
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			// TODO: reactivate when needed
			// "react-native-reanimated/plugin",
			// https://www.npmjs.com/package/react-native-dotenv
			[
				"module:react-native-dotenv",
				{
					moduleName: "react-native-dotenv",
				},
			],
		],
	}
}
