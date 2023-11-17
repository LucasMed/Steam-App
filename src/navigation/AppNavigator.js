import React, { useRef } from "react";
import { observer } from "mobx-react-lite";
import {
	DarkTheme,
	DefaultTheme,
	NavigationContainer,
} from "@react-navigation/native";

import AuthNavigator from "./AuthNavigator";
import GuestNavigator from "./GuestNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

import { useStore } from "../providers/StoreProvider";
import NavigationHelper from "../helpers/navigation";

import SplashScreen from "../components/SplashScreen";

const AppNavigator = ({ colorScheme }) => {
	const { authStore } = useStore();
	const routeNameRef = useRef();
	NavigationHelper.setRouteNameRef(routeNameRef);

	if (true) {
		return (
			<NavigationContainer
				ref={NavigationHelper.navigationRef}
				linking={LinkingConfiguration}
				theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
			>
				{false ? <AuthNavigator /> : <GuestNavigator />}
			</NavigationContainer>
		);
	}

	return <SplashScreen />;
};

export default observer(AppNavigator);
