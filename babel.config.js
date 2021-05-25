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
			[
				// ! added to create alias for all components imports.  Avoids needing relative path
				"module-resolver",
				{
					baseUrl: ".",
					alias: {
						"@components": "./src/components",
						"@hooks": "./src/hooks",
						"@icons": "./src/components/Icons",
						"@navigation": "./src/navigation",
						"@redux": "./src/redux",
						"@screens": "./src/screens",
						"@styles": "./src/styles",
						"@utils": "./src/utils",
					},
				},
			],
		],
	}
}
