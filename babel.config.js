module.exports = function (api) {
	api.cache(true)
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			"react-native-reanimated/plugin",
			// https://www.npmjs.com/package/react-native-dotenv
			[
				"module:react-native-dotenv",
				{
					moduleName: "react-native-dotenv",
				},
			],
			[
				// ! added to create alias for all components imports.  Avoids needing relative path
				"module-resolver",
				{
					root: ["./"],
					alias: {
						"@components": ".src/components/",
					},
				},
			],
		],
	}
}
