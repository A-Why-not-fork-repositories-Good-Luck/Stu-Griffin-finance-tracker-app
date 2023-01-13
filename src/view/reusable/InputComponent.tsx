import React, { ReactElement } from "react";
import { InputComponentPropsI } from "../../types/Input";
import { RFPercentage } from "react-native-responsive-fontsize";
import { StyleSheet, View, Text, TextInput } from "react-native";

export default function InputComponent({value, title, changeValueFunc, keyboardType}: InputComponentPropsI): ReactElement {
	return (
		<View>
			<Text style={styles.title}>{title}</Text>
			<TextInput value={value} style={styles.input} keyboardType={keyboardType} onChangeText={changeValueFunc}/>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		color: "gray",
		fontSize: RFPercentage(2),
	},
	input: {
		color: "black",
		borderColor: "gray",
		borderBottomWidth: 1,
		fontSize: RFPercentage(2),
	},
});
