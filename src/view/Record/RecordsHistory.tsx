import 'react-native-get-random-values';
import { useSelector } from 'react-redux';
import { types } from '../../model/record';
import { RootState } from '../../types/redux';
import { TypeI } from '../../types/recordTypes';
import { BankAccountI } from '../../types/bankAccount';
import { RecordStoreI, RecordI } from '../../types/record';
import GrayCircleIcon from '../../../assets/icons/GrayCircleIcon';
import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';

export default function RecordsHistory(): ReactElement {
	const [listData, setListData] = useState<Array<RecordI>>([]);
	const records: RecordStoreI = useSelector((state: RootState) => state.records);
	const bankAccounts: Array<BankAccountI> = useSelector((state: RootState) => state.bankAccounts);
	
	useEffect(() => {
		const arr: Array<RecordI> = [];
		const objectKeys = Object.keys(records);
		objectKeys.map((el: string) => {
			arr.push(...records[el]);
		});
		setListData(arr);
	}, [records]);

	const renderItem = (item: RecordI): ReactNode => {
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
					(listData.length === 0) ?
						<Text>There is no records</Text>:
						listData.map((el: RecordI) => {
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
		borderWidth: 1,
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
		marginTop: 10,
		borderRadius: 10,
		marginBottom: 100,
		paddingVertical: 10,
		alignItems: 'center',
		backgroundColor: 'white',
		justifyContent: 'center',
		width: Dimensions.get('window').width-25,
	},
	iconCircle: {
		padding: 10,
		borderWidth: 2,
		borderRadius: 100,
		borderColor: '#236F57',
	},
});