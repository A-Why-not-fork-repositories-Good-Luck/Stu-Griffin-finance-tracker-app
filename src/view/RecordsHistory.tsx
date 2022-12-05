import { types } from '../model/record';
import 'react-native-get-random-values';
import React, { ReactNode } from 'react';
import { RecordI } from '../types/record';
import { useSelector } from 'react-redux';
import { RootState } from '../types/redux';
import { TypeI } from '../types/recordTypes';
import { BankAccountI } from '../types/bankAccount';
import GrayCircleIcon from '../../assets/icons/GrayCircleIcon';
import { ScrollView, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';

export default function RecordsHistory() {
	const records: Array<RecordI> = useSelector((state: RootState) => state.records);
	const bankAccounts: Array<BankAccountI> = useSelector((state: RootState) => state.bankAccounts);

	const renderItem = (item: RecordI) => {
		const typeIcon = types.filter((el: TypeI) => el.title === item.type);
		const res = bankAccounts.filter((el: BankAccountI) => el.id === item.bankAccountId);
		return(
			<TouchableOpacity style={styles.card} key={item.id}>
				{getRecordTypeIcon(typeIcon[0]?.icon)}
				<View>
					<Text style={styles.type}>{item.type}</Text>
					{getRecordComment(item.comment)}
				</View>
				<Text style={[styles.ammount, getRecordAmmountStyle(item.recordType)]}>
					{getRecordAmmountSymbol(item.recordType)}{item.ammount} {res[0]?.currency}
				</Text>
			</TouchableOpacity>
		);
	};

	const getRecordComment = (comment: string): ReactNode => {
		return(
			(comment !== '') && <Text>{comment}</Text>
		);
	};

	const getRecordAmmountStyle = (recordType: string): object => {
		return(
			(recordType === 'income') ? {color: 'green'} : {color: 'red'}
		);
	};

	const getRecordAmmountSymbol = (recordType: string): string => {
		return(
			(recordType === 'income') ? '+' : '-'
		);
	};

	const getRecordTypeIcon = (icon: ReactNode|undefined): ReactNode => {
		return(
			(icon !== undefined) ?
				<View style={styles.iconCircle}>
					{icon}
				</View>
				:
				<GrayCircleIcon width={50} height={50} fill={'gray'}/>
		);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>History</Text>
			<ScrollView>
				{
					(records.length === 0) ?
						<Text>There is no records</Text>:
						records.map((el: RecordI) => {
							return(
								renderItem(el)
							);
						})
				}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		width: 325,
		height: 80,
		padding: 10,
		borderRadius: 10,
		marginVertical: 10,
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 10,
		backgroundColor: 'white',
		justifyContent: 'space-between',
	},
	type: {
		fontSize: 17,
	},
	title: {
		fontSize: 30,
		color: 'black',
		marginVertical: 10,
		textAlign: 'center',
	},
	ammount: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	container: {
		height: 450,
		paddingVertical: 10,
		alignItems: 'center',
		justifyContent: 'center',
		width: Dimensions.get('window').width,
	},
	iconCircle: {
		padding: 10,
		borderWidth: 2,
		borderRadius: 100,
		borderColor: '#236F57',
	},
});