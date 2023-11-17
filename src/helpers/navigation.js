import {
	createNavigationContainerRef,
	CommonActions,
	StackActions,
} from "@react-navigation/native";

import Routes from "../navigation/routes";

let _routeNameRef;
const navigationRef = createNavigationContainerRef();

const setRouteNameRef = (ref) => {
	_routeNameRef = ref;
};

const onReadyNavigator = () => {
	_routeNameRef.current = navigationRef.getCurrentRoute().name;
};

const onNavigationStateChange = async () => {
	const currentRouteName = navigationRef.getCurrentRoute().name;

	_routeNameRef.current = currentRouteName;
};

const navigate = (name, params) => {
	if (navigationRef.isReady()) {
		navigationRef.navigate(name, params);
	} else {
		setTimeout(() => {
			navigate(name, params);
		}, 500);
	}
};

const push = (...args) => {
	if (navigationRef.isReady()) {
		navigationRef.dispatch(StackActions.push(...args));
	}
};

const resetNavigation = () => {
	if (navigationRef.isReady()) {
		navigationRef.dispatch(
			CommonActions.reset({
				index: 1,
				routes: [{ name: Routes.LOGIN }],
			})
		);
	}
};

// add other navigation functions that you need and export them

export default {
	setRouteNameRef,
	navigationRef,
	onReadyNavigator,
	onNavigationStateChange,
	navigate,
	push,
	resetNavigation,
};
