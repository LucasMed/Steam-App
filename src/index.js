import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useLoadedAssets } from "./hooks/useLoadedAssets";

import { useColorScheme } from "react-native";
import Global from "./components/Global";
import StoreProvider from "./providers/StoreProvider";
import RootStore from "./stores/RootStore";

export default function App() {
	const isLoadingComplete = useLoadedAssets();
	const colorScheme = useColorScheme();

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<StoreProvider value={RootStore}>
				<SafeAreaProvider>
					<Global colorScheme={colorScheme} />
				</SafeAreaProvider>
			</StoreProvider>
		);
	}
}
