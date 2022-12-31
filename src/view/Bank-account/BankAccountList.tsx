import Modal from 'react-native-modal';
import 'react-native-get-random-values';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CrossIcon from '../../../assets/icons/CrossIcon';
import { FlatList } from 'react-native-gesture-handler';
import DeleteIcon from '../../../assets/icons/DeleteIcon';
import { AppDispatch, RootState } from '../../types/redux';
import { deleteBankAccounts } from '../../redux/bankAccount';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { BankAccountI, CardItemI, BankAccountListPropsI } from '../../types/BankAccount';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, Pressable } from 'react-native';

export default function BankAccountList({modalStatus, closeModal, saveChanges}: BankAccountListPropsI): ReactElement {
	const dispatch: AppDispatch = useDispatch();
	const bankAccounts: Array<BankAccountI> = useSelector((state: RootState) => state.bankAccounts);
	
	const renderItem = ({ item }: CardItemI): ReactElement => {
		return(
			<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: Dimensions.get('window').width - 120}}>
				<TouchableOpacity style={styles.card} onPress={() => {
					saveChanges(item.id);
					closeModal();
				}}>
					<Text style={styles.cardTitle}>{item.title}</Text>
					<Text style={styles.cardText}>{item.ammount} {item.currency}</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {
					dispatch(deleteBankAccounts(item.id));
				}}>
					<DeleteIcon width={30} height={30}/>
				</TouchableOpacity>
			</View>
		);
	};
	
	return(
		<Modal
			isVisible={modalStatus}
			style={styles.modalArea}
			onBackdropPress={() => closeModal()}
		>
			<View style={styles.modal}>
				<TouchableOpacity style={styles.crossIcon} onPress={closeModal}>
					<CrossIcon/>
				</TouchableOpacity>
				{
					(bankAccounts.length !== 0) ?
						<FlatList
							data={bankAccounts}
							renderItem={renderItem}
							keyExtractor={item => item.id}
						/> 
						:
						<Pressable style={{justifyContent: 'center', alignItems: 'center', flex: 1}} onPress={closeModal}>
							<Text style={{fontSize: 25, color: 'red', fontWeight: 'bold', textAlign: 'center'}}>You have no bank accounts !!</Text>
						</Pressable>
				}
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	card: {
		width: 200,
		height: 80,
		padding: 10,
		borderWidth: 1,
		borderRadius: 10,
		marginVertical: 10,
		marginHorizontal: 10,
		justifyContent: 'space-around',
	},
	modal: {
		padding: 15,
		paddingTop: 30,
		borderRadius: 15,
		alignItems: 'center',
		paddingHorizontal: 15,
		backgroundColor: 'white',
		width: Dimensions.get('window').width - 70,
		height: Dimensions.get('window').height - 150,
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
	typeCard: {
		marginVertical: 10,
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 10,
	},
	cardText: {
		color: 'black',
		fontWeight: 'bold',
		fontSize: RFPercentage(2.5),
	},
	cardTitle: {
		color: 'black',
		fontSize: RFPercentage(2),
	},
	modalArea: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	typeTitle: {
		marginLeft: 10,
		fontSize: RFPercentage(2),
	},
	crossIcon: {
		top: '-2.5%',
		left: '42.5%',
		position: 'relative',
	},
});