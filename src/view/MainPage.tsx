import React from 'react';
import BankAccounts from './BankAccounts';
import { StatusBar } from 'expo-status-bar';
import AddIcon from '../../assets/icons/AddIcon';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MainPage() {
	const navigation: any = useNavigation();

	return (
		<View style={styles.container}>
			<BankAccounts/>
			<TouchableOpacity
				style={styles.addIcon}
				onPress={() => navigation.navigate('create-record-page')}
			>
				<AddIcon
					width={60}
					height={60}
					fillCross={'white'}
					fillRound={'#236F57'}
				/>
			</TouchableOpacity>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	addIcon: {
		position: 'relative',
		top: windowHeight - 580,
		left: windowWidth - 245,
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
