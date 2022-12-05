import React, { useState } from 'react';
import 'react-native-get-random-values';
import { useSelector } from 'react-redux';
import { RootState } from '../types/redux';
import AddIcon from '../../assets/icons/AddIcon';
import CreateBankAccount from './CreateBankAccount';
import { BankAccountI } from '../types/bankAccount';
import { FlatList, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';

interface ItemI {
	item: BankAccountI;
}

export default function BankAccounts() {
	const [modalStatus, setModalStatus] = useState<boolean>(false);
	const bankAccounts: Array<BankAccountI> = useSelector((state: RootState) => state.bankAccounts);

	const openModal = (): void => {
		setModalStatus(true);
	};

	const closeModal = (): void => {
		setModalStatus(false);
	};

	const renderItem = ({ item }: ItemI) => {
		return(
			<TouchableOpacity style={styles.card}>
				<Text style={styles.cardTitle}>{item.title}</Text>
				<Text style={styles.cardText}>{item.ammount} {item.currency}</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Bank accounts</Text>
			<FlatList
				horizontal={true}
				data={bankAccounts}
				renderItem={renderItem}
				keyExtractor={item => item.id}
				ListFooterComponent={
					<TouchableOpacity onPress={openModal}>
						<View style={[styles.card, styles.createCard]}>
							<Text style={[styles.cardTitle, styles.createCardTitle]}>Add bank account</Text>
							<AddIcon
								width={50}
								height={50}
								fillCross={'white'}
								fillRound={'#236F57'}
							/>
						</View>
					</TouchableOpacity>
				}
			/>
			<CreateBankAccount
				closeModal={closeModal}
				modalStatus={modalStatus}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		width: 200,
		height: 80,
		padding: 10,
		borderRadius: 10,
		marginVertical: 10,
		marginHorizontal: 10,
		backgroundColor: 'white',
		justifyContent: 'space-around',
	},
	title: {
		fontSize: 30,
		color: 'black',
		marginVertical: 10,
		textAlign: 'center',
	},
	cardText: {
		fontSize: 20,
		color: 'black',
		fontWeight: 'bold',
	},
	cardTitle: {
		fontSize: 17,
		color: 'black',
	},
	container: {
		paddingVertical: 10,
		justifyContent: 'center',
		width: Dimensions.get('window').width,
	},
	createCard: {
		alignItems: 'center',
		flexDirection: 'row',
	},
	createCardTitle: {
		width: '55%',
		fontSize: 22.5,
		fontWeight: 'bold',
	}
});