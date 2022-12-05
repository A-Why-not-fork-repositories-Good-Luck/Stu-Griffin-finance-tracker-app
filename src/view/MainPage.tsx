import React, { useEffect } from 'react';
import BankAccounts from './BankAccounts';
import { RootState } from '../types/redux';
import { StatusBar } from 'expo-status-bar';
import { setRecords } from '../redux/records';
import RecordsHistory from './RecordsHistory';
import AddIcon from '../../assets/icons/AddIcon';
import { setBankAccounts } from '../redux/bankAccount';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, StyleSheet, TouchableOpacity, View, Dimensions, AppState } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function MainPage() {
	const dispatch = useDispatch();
	const navigation: any = useNavigation();
	const records = useSelector((state: RootState) => state.records);
	const bankAccounts = useSelector((state: RootState) => state.bankAccounts);

	// AsyncStorage.removeItem('records');
	// AsyncStorage.removeItem('bank-accounts');

	useEffect(() => {
		const subscription = AppState.addEventListener('change', nextAppState => {
			switch(nextAppState) {
			case 'active':
				getDataFromAsyncStorage('records');
				getDataFromAsyncStorage('bank-accounts');
				break;
			case 'background':
				setDataFromAsyncStorage('records', JSON.stringify(records));
				setDataFromAsyncStorage('bank-accounts', JSON.stringify(bankAccounts));
				break;
			default:
			}
		});
		return () => {
			subscription.remove();
		};
	}, [bankAccounts, records]);

	const getDataFromAsyncStorage = async(key: string): Promise<void> => {
		try {
			let result: any = await AsyncStorage.getItem(key);
			(typeof result === 'string') ? result = JSON.parse(result) : result = [];
			switch(key) {
			case 'records':
				dispatch(setRecords(result));
				break;
			case 'bank-accounts':
				dispatch(setBankAccounts(result));
				break;
			default:
			}
		} catch(e) {
			console.log(e);
		}
	};

	const setDataFromAsyncStorage = async(key: string, value: any): Promise<void> => {
		try {
			await AsyncStorage.setItem(key, value);
			console.log('saved');
		} catch(e) {
			console.log(e);
		}
	};
	return (
		<View style={styles.container}>
			<ScrollView style={{
				zIndex: 1,
				paddingTop: 10,
				height: windowHeight,
			}}>
				<BankAccounts/>
				<RecordsHistory/>
			</ScrollView>
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
		zIndex: 100,
		position: 'absolute',
		top: windowHeight - 75,
		left: windowWidth - 75,
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
