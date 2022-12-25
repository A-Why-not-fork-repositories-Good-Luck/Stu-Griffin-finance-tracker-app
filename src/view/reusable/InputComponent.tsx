import React, { ReactElement } from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { StyleSheet, View, Text, TextInput, KeyboardType } from 'react-native';

interface PropsI {
	value: string;
	title: string;
	keyboardType: KeyboardType;
	changeValueFunc: (value: string) => void;
}

export default function InputComponent({value, title, changeValueFunc, keyboardType}: PropsI): ReactElement {
	return (
		<View>
			<Text style={styles.title}>{title}</Text>
			<TextInput
				value={value}
				style={styles.input}
				keyboardType={keyboardType}
				onChangeText={changeValueFunc}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		color: 'gray',
		fontSize: RFPercentage(2),
	},
	input: {
		color: 'black',
		borderColor: 'gray',
		borderBottomWidth: 1,
		fontSize: RFPercentage(2),
	},
});
