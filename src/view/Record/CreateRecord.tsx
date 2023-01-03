import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import RecordTypesList from './RecordTypesList';
import { BankAccountI } from '../../types/BankAccount';
import { AppDispatch, RootState } from '../../types/redux';
import { navigationType } from '../../types/Navigation';
import InputComponent from '../reusable/InputComponent';
import { useNavigation } from '@react-navigation/native';
import BankAccountList from '../Bank-account/BankAccountList';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { recordFormState, recordTypes } from '../../model/record';
import { stateAction, notification } from '../../controller/reusable';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import React, { useReducer, ReactNode, useEffect, useState, ReactElement } from 'react';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { createRecord, constructStyleObjForTextButton, constructStyleObjForButton, recordReducer, updateRecord } from '../../controller/Record';

export default function CreateRecord({ route }: any): ReactElement {
	const [key, setKey] = useState<string>('');
	const dispatch: AppDispatch = useDispatch();
	const [date, setDate] = useState<Date>(new Date());
	const navigation: navigationType = useNavigation();
	const [ammountBackUp, setAmmountBackUp] = useState<string>('');
	const [buttonStatus, setButtonStatus] = useState<boolean>(false);
	const [state, dispatchState] = useReducer(recordReducer, recordFormState);
	const [datePickerShowStatus, setDatePickerShowStatus] = useState<boolean>(false);
	const [recordTypeModalStatus, setRecordTypeModalStatus] = useState<boolean>(false);
	const [bankAccountModalStatus, setBankAccountModalStatus] = useState<boolean>(false);
	const bankAccounts: Array<BankAccountI> = useSelector((state: RootState) => state.bankAccounts);

	useEffect(() => {
		stateAction(dispatchState, 'add', 'id', route.params?.record.id || uuidv4());
		stateAction(dispatchState, 'add', 'date', route.params?.record.date || JSON.parse(JSON.stringify(new Date())).split('T')[0]);
		if(route.params?.record) {
			setKey(route.params?.record.parentType);
			setAmmountBackUp((route.params?.record.ammount)?.toString());
			stateAction(dispatchState, 'add', 'type', route.params?.record.type);
			stateAction(dispatchState, 'add', 'color', route.params?.record.color);
			stateAction(dispatchState, 'add', 'comment', route.params?.record.comment);
			stateAction(dispatchState, 'add', 'ammount', route.params?.record.ammount);
			stateAction(dispatchState, 'add', 'recordType', route.params?.record.recordType);
			stateAction(dispatchState, 'add', 'parentType', route.params?.record.parentType);
			stateAction(dispatchState, 'add', 'bankAccountId', route.params?.record.bankAccountId);
		}
	}, []);
	
	useEffect(() => {
		setButtonStatus(Object.values(state).every((el: unknown) => !!el === true));
	}, [state]);

	const buttonAction = (): void => {
		const id = bankAccounts.findIndex((el: BankAccountI) => el.id === state.bankAccountId);
		if((new Date(state.date) >= new Date(bankAccounts[id].date))) {
			let message;
			if(route.params?.record) {
				message = 'Bank record has been updated';
				updateRecord(dispatch, state, key, ammountBackUp);
			} else {
				createRecord(dispatch, state, key);
				message = 'New bank record has been created';
			}
			notification('success', message);
			navigation.navigate('main-page');
		} else {
			notification('danger', 'Bank account is younger than your record');
		}
	};

	const setDateFunc = (event: DateTimePickerEvent, date: Date|undefined): void => {
		if(date) {
			switch(event.type) {
			case 'set':
				setDate(date);
				stateAction(dispatchState, 'add', 'date', JSON.parse(JSON.stringify(date)).split('T')[0]);
				break;
			case 'dismissed':
				break;
			default:
			}
		}
		setDatePickerShowStatus(false);
	};

	return(
		<View style={styles.container}>
			<View style={styles.recordTypeList}>
				{
					recordTypes.map((el: string, index: number): ReactNode => {
						return(
							<TouchableOpacity
								key={index}
								style={[styles.recordType, constructStyleObjForButton(el, state)]}
								onPress={() => {
									stateAction(dispatchState, 'add', 'recordType', el.toLowerCase());
								}} 
							>
								<Text style={[styles.recordTypeText, constructStyleObjForTextButton(el, state)]}>{el}</Text>
							</TouchableOpacity>
						);
					})
				}
			</View>
			<InputComponent
				title='Ammount'
				value={state?.ammount}
				keyboardType='numeric'
				changeValueFunc={(value: string) => {
					stateAction(dispatchState, 'add', 'ammount', value);
				}}
			/>
			<InputComponent
				title='Comment'
				value={state?.comment}
				keyboardType='default'
				changeValueFunc={(value: string) => {
					stateAction(dispatchState, 'add', 'comment', value);
				}}
			/>
			<View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
				<TouchableOpacity style={[styles.button, {width: 150}]} onPress={() => {
					setRecordTypeModalStatus(true);
				}}>
					<Text style={styles.buttonText}>Record type</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.button, {width: 150}]} onPress={() => {
					setBankAccountModalStatus(true);
				}}>
					<Text style={styles.buttonText}>Bank account</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity onPress={() => setDatePickerShowStatus(true)}>
				<Text style={styles.title}>Date</Text>
				<Text style={styles.input}>{state?.date}</Text>
			</TouchableOpacity>
			<TouchableOpacity disabled={!buttonStatus} style={[styles.button, (!buttonStatus) ? {opacity: 0.5} : {opacity: 1}]} onPress={buttonAction}>
				<Text style={styles.buttonText}>{(route.params?.record) ? 'Update record' : 'Save record'}</Text>
			</TouchableOpacity>
			<RecordTypesList
				closeModal={() => {
					setRecordTypeModalStatus(false);
				}}
				modalStatus={recordTypeModalStatus}
				saveChanges={(key: string, value: string|Array<number>) => {
					stateAction(dispatchState, 'add', key, value);
				}}
				saveKey={(el: string) => setKey(el)}
			/>
			<BankAccountList
				closeModal={() => {
					setBankAccountModalStatus(false);
				}}
				saveChanges={(item: string) => {
					stateAction(dispatchState, 'add', 'bankAccountId', item);
				}}
				modalStatus={bankAccountModalStatus}
			/>
			{
				(datePickerShowStatus) &&
				<RNDateTimePicker
					value={date}
					display="default"
					onChange={setDateFunc}
					maximumDate={new Date()}
				/>
			}
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
		fontSize: RFPercentage(2.2),
	},
	button: {
		padding: 10,
		marginTop: 10,
		borderRadius: 10,
		backgroundColor: '#236F57',
	},
	typeCard: {
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 10,
	},
	typeIcon: {
		width: 50,
		height: 50,
		borderWidth: 2,
		borderRadius: 100,
		alignItems: 'center',
		borderColor: '#236F57',
		justifyContent: 'center',
	},
	typeTitle: {
		marginLeft: 10,
		fontSize: RFPercentage(2.5),
	},
	container: {
		flex: 1,
		padding: 30,
		justifyContent: 'space-around'
	},
	recordType: {
		width: 125,
		padding: 10,
		borderRadius: 10,
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
		fontSize: RFPercentage(2.2),
	},
	recordTypeText: {
		textAlign: 'center',
		fontSize: RFPercentage(2),
	},
	recordTypeList: {
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
});