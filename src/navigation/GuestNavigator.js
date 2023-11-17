import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Routes from "./routes";
import Login from "../screens/Login";

const Stack = createStackNavigator();

const GuestNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name={Routes.LOGIN} component={Login} />
		</Stack.Navigator>
	);
};

export default GuestNavigator;
