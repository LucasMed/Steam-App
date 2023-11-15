// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native";

import Colors from "../constants/Colors";
import TabHomeScreen from "../screens/Home";
import TabSearchScreen from "../screens/Search";
import TabProfileScreen from "../screens/Profile";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
	const colorScheme = useColorScheme();

	return (
		<BottomTab.Navigator
			initialRouteName="TabOne"
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

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabHomeStack = createStackNavigator();

function TabHomeNavigator() {
	return (
		<TabHomeStack.Navigator>
			<TabHomeStack.Screen
				name="TabHomeScreen"
				component={TabHomeScreen}
				options={{ headerTitle: "Home" }}
			/>
		</TabHomeStack.Navigator>
	);
}

const TabSearchStack = createStackNavigator();

function TabSearchNavigator() {
	return (
		<TabSearchStack.Navigator>
			<TabSearchStack.Screen
				name="TabSearchScreen"
				component={TabSearchScreen}
				options={{ headerTitle: "Search" }}
			/>
		</TabSearchStack.Navigator>
	);
}

const TabProfileStack = createStackNavigator();

function TabProfileNavigator() {
	return (
		<TabProfileStack.Navigator>
			<TabProfileStack.Screen
				name="TabProfileScreen"
				component={TabProfileScreen}
				options={{ headerTitle: "Profile" }}
			/>
		</TabProfileStack.Navigator>
	);
}
