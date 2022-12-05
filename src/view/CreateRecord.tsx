import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { addRecord } from '../redux/records';
import RecordTypesList from './RecordTypesList';
import BankAccountList from './BankAccountList';
import { recordReducer } from '../controller/record';
import InputComponent from './reusable/InputComponent';
import { useNavigation } from '@react-navigation/native';
import { changeBankAccount } from '../redux/bankAccount';
import { recordFormState, recordTypes } from '../model/record';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import React, { useReducer, ReactNode, useEffect, useState } from 'react';

export default function CreateRecord() {
	const dispatchStore = useDispatch();
	const navigation: any = useNavigation();
	const [state, dispatch] = useReducer(recordReducer, recordFormState);
	const [recordTypeModalStatus, setRecordTypeModalStatus] = useState(false);
	const [bankAccountModalStatus, setBankAccountModalStatus] = useState(false);
	
	useEffect(() => {
		dispatch({
			type: 'add',
			payload: {
				key: 'id',
				value: uuidv4(),
			}
		});
		dispatch({
			type: 'add',
			payload: {
				key: 'date',
				value: JSON.parse(JSON.stringify(new Date())).split('T')[0],
			}
		});
	}, []);

	const createRecordFunc = (): void => {
		dispatchStore(addRecord(state));
		dispatchStore(changeBankAccount({
			recordType: state.recordType,
			recordAmmount: state.ammount,
			bankAccountId: state.bankAccountId,
		}));
		navigation.navigate('main-page');
	};

	const constructStyleObjForButton = (el: string): object => {
		return (el.toLowerCase() === state.recordType) ? {backgroundColor: '#236F57'} : {borderColor: '#236F57', borderWidth: 2};
	};

	const constructStyleObjForTextButton = (el: string): object => {
		return (el.toLowerCase() === state.recordType) ? {color: 'white'} : {color: '#236F57',};
	};

	return(
		<View style={styles.container}>
			<View style={styles.recordTypeList}>
				{
					recordTypes.map((el: string, index: number): ReactNode => {
						return(
							<TouchableOpacity
								key={index}
								style={[styles.recordType, constructStyleObjForButton(el)]}
								onPress={() => {
									dispatch({
										type: 'add',
										payload: {
											key: 'recordType',
											value: el.toLowerCase(),
										}
									});
								}} 
							>
								<Text style={[styles.recordTypeText, constructStyleObjForTextButton(el)]}>{el}</Text>
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
					dispatch({
						type: 'add',
						payload: {
							value: value,
							key: 'ammount',
						}
					});
				}}
			/>
			<InputComponent
				title='Comment'
				value={state?.comment}
				keyboardType='default'
				changeValueFunc={(value: string) => {
					dispatch({
						type: 'add',
						payload: {
							value: value,
							key: 'comment',
						}
					});
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
			<InputComponent
				title='Date'
				value={state?.date}
				keyboardType='default'
				changeValueFunc={(value: string) => {
					dispatch({
						type: 'add',
						payload: {
							key: 'date',
							value: value,
						}
					});
				}}
			/>
			<TouchableOpacity style={styles.button} onPress={createRecordFunc}>
				<Text style={styles.buttonText}>Save record</Text>
			</TouchableOpacity>
			<RecordTypesList
				closeModal={() => {
					setRecordTypeModalStatus(false);
				}}
				modalStatus={recordTypeModalStatus}
				saveChanges={(key: string, value: string) => {
					dispatch({
						type: 'add',
						payload: {
							key, value,
						}
					});
				}}
			/>
			<BankAccountList
				closeModal={() => {
					setBankAccountModalStatus(false);
				}}
				saveChanges={(item: string) => {
					dispatch({
						type: 'add',
						payload: {
							value: item,
							key: 'bankAccountId',
						}
					});
				}}
				modalStatus={bankAccountModalStatus}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
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
		fontSize: 17,
		marginLeft: 10,
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
		fontSize: 20,
		color: 'white',
		textAlign: 'center',
	},
	recordTypeText: {
		fontSize: 18,
		textAlign: 'center',
	},
	recordTypeList: {
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
});