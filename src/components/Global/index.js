import React from "react";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "../../navigation/AppNavigator";

const Global = ({ colorScheme }) => (
	<>
		<StatusBar barStyle="dark-content" />
		<AppNavigator colorScheme={colorScheme} />
	</>
);

export default Global;
