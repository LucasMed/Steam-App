import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";

export default function SplashScreen() {
	return (
		<View style={styles.container}>
			<Text style={{ color: "#FFF", fontSize: 24 }}>SplashScreen</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#202742",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
