import { types } from '../model/record';
import { TypeI } from '../types/recordTypes';
import { recordFormState } from '../model/record';
import React, { useReducer, ReactNode } from 'react';
import { recordReducer } from '../controller/record';
import InputComponent from './reusable/InputComponent';
import { FlatList } from 'react-native-gesture-handler';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

interface ItemI {
	item: TypeI
}

export default function CreateRecord() {
	const [state, dispatch] = useReducer(recordReducer, recordFormState);

	const renderItem = ({ item }: ItemI) => {
		return (
			<TouchableOpacity style={styles.typeCard}>
				<View style={styles.typeIcon}>
					{item.icon}
				</View>
				<Text style={styles.typeTitle}>{item.title}</Text>
			</TouchableOpacity>
		);
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
					['Income', 'Outcome'].map((el: string, index: number): ReactNode => {
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
			<View style={{height: '50%', marginTop: 10}}>
				<FlatList
					data={types}
					renderItem={renderItem}
					keyExtractor={(item: TypeI, index: number) => index.toString()}
				/>
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
			<TouchableOpacity style={styles.button}>
				<Text style={styles.buttonText}>Save record</Text>
			</TouchableOpacity>
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
		marginVertical: 10,
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
		paddingHorizontal: 15,
		paddingVertical: 15,
		justifyContent: 'center'
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