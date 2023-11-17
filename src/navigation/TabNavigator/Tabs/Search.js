import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TabSearchScreen from "../../../screens/Search";

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

export default TabSearchNavigator;
