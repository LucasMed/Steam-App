// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useColorScheme } from "react-native";

import Colors from "../../constants/Colors";

import TabHomeNavigator from "./Tabs/Home";
import TabSearchNavigator from "./Tabs/Search";
import TabProfileNavigator from "./Tabs/Profile";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
	const colorScheme = useColorScheme();

	return (
		<BottomTab.Navigator
			initialRouteName="TabHomeScreen"
			screenOptions={{ tabBarActiveTintColor: Colors[colorScheme].tint }}
		>
			<BottomTab.Screen
				name="Home"
				component={TabHomeNavigator}
				options={{
					headerShown: false,
					tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
				}}
			/>
			<BottomTab.Screen
				name="Search"
				component={TabSearchNavigator}
				options={{
					headerShown: false,
					tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
				}}
			/>
			<BottomTab.Screen
				name="Profile"
				component={TabProfileNavigator}
				options={{
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="person-circle-outline" color={color} />
					),
				}}
			/>
		</BottomTab.Navigator>
	);
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props) {
	return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
