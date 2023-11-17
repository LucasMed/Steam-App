import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TabProfileScreen from "../../../screens/Profile";

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

export default TabProfileNavigator;
