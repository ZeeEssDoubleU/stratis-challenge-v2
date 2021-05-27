import Reactotron from "reactotron-react-native"
import { reactotronRedux } from "reactotron-redux"

// ************
// logger
// ************

// https://github.com/infinitered/reactotron/blob/master/docs/plugin-redux.md
export const reactotron = Reactotron
	// .setAsyncStorageHandler()
	.configure()
	.useReactNative()
	.use(reactotronRedux())
	.connect()
