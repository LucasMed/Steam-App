import { StyleSheet, Image } from "react-native";

import { Text, View } from "../../components/Themed";
import Splash from '../../../assets/images/splash.png'

export default function SplashScreen() {
	return (
		<View style={styles.container}>
			<View
				style={styles.separator}
				lightColor="#eee"
				darkColor="rgba(255,255,255,0.1)"
			/>
      <Image src={Splash}  />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
    backgroundColor: '#202742'
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
