import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TabHomeScreen from "../../../screens/Home";

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

export default TabHomeNavigator;
