import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";

export default function GameDetail() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Tab One</Text>
			<View
				style={styles.separator}
				lightColor="#eee"
				darkColor="rgba(255,255,255,0.1)"
			/>
      <Text>
        Header Image
      </Text>
      <Text>
        Description
      </Text>
      <Text>
        Buy
      </Text>
      <Text>
        Screenshots
      </Text>
      <Text>
        About
      </Text>
      <Text>
        Requirements
      </Text>
      <Text>
        Related games
      </Text>
      <Text>
        Reviews
      </Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
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
