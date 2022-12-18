import 'react-native-get-random-values';
import { useSelector } from 'react-redux';
import { RootState } from '../../types/redux';
import BankAccountList from './BankAccountList';
import AddIcon from '../../../assets/icons/AddIcon';
import CreateBankAccount from './CreateEditBankAccount';
import React, { ReactElement, useState } from 'react';
import { BankAccountI } from '../../types/bankAccount';
import SettingIcon from '../../../assets/icons/SettingIcon';
import { FlatList, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';

interface ItemI {
	item: BankAccountI;
}

export default function BankAccounts(): ReactElement {
	const [cardId, setCardId] = useState('');
	const [modalBankAccountListStatus, setModalBankAccountListStatus] = useState<boolean>(false);
	const [modalCreateBankAccountStatus, setModalCreateBankAccountStatus] = useState<boolean>(false);
	const bankAccounts: Array<BankAccountI> = useSelector((state: RootState) => state.bankAccounts);

	const renderItem = ({ item }: ItemI): ReactElement => {
		return(
			<TouchableOpacity style={styles.card}>
				<Text style={styles.cardTitle}>{item.title}</Text>
				<Text style={styles.cardText}>{item.ammount} {item.currency}</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.containerTitle}>
				<Text style={styles.title}>Bank accounts</Text>
				<TouchableOpacity onPress={() => setModalBankAccountListStatus(true)} style={styles.settingBox}>
					<SettingIcon width={20} height={20} fill={'black'}/>
				</TouchableOpacity>
			</View>
			<FlatList
				horizontal={true}
				data={bankAccounts}
				renderItem={renderItem}
				keyExtractor={item => item.id}
				ListFooterComponent={
					<TouchableOpacity onPress={() => setModalCreateBankAccountStatus(true)}>
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
				cardId={cardId}
				modalStatus={modalCreateBankAccountStatus}
				closeModal={() => setModalCreateBankAccountStatus(false)}
			/>
			<BankAccountList
				modalStatus={modalBankAccountListStatus}
				closeModal={() => setModalBankAccountListStatus(false)}
				saveChanges={(item: string) => {
					setCardId(item);
					setModalBankAccountListStatus(false);
					setModalCreateBankAccountStatus(true);
				}}
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
		borderWidth: 1.5,
		marginVertical: 10,
		marginHorizontal: 10,
		backgroundColor: 'white',
		justifyContent: 'space-around',
	},
	title: {
		fontSize: 30,
		color: 'black',
		marginVertical: 10,
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
		marginTop: 30,
		borderRadius: 10,
		paddingVertical: 10,
		backgroundColor: 'white',
		width: Dimensions.get('window').width-25,
	},
	settingBox: {
		padding: 5,
		borderWidth: 1,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	createCard: {
		alignItems: 'center',
		flexDirection: 'row',
	},
	containerTitle: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10,
		justifyContent: 'space-between',
	},
	createCardTitle: {
		width: '55%',
		fontSize: 22.5,
		fontWeight: 'bold',
	}
});