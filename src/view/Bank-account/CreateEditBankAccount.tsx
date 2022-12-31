import Modal from 'react-native-modal';
import 'react-native-get-random-values';
import { Picker } from '@react-native-picker/picker';
import FlashMessage from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';
import CrossIcon from '../../../assets/icons/CrossIcon';
import InputComponent from '../reusable/InputComponent';
import { AppDispatch, RootState } from '../../types/redux';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { notification, stateAction } from '../../controller/reusable';
import { currency, bankAccountFormState } from '../../model/bankAccount';
import { CreateEditBankAccountPropsI, BankAccountI } from '../../types/BankAccount';
import { StyleSheet, TouchableOpacity, View, Dimensions, Text } from 'react-native';
import React, { useReducer, ReactNode, useEffect, ReactElement, useState } from 'react';
import { bankAccountReducer, getInitialData, createBankAccount } from '../../controller/BankAccount';

export default function CreateEditBankAccount({modalStatus, closeModal, cardId}: CreateEditBankAccountPropsI): ReactElement {
	const dispatch: AppDispatch = useDispatch();
	const [buttonStatus, setButtonStatus] = useState<boolean>(false);
	const [state, dispatchState] = useReducer(bankAccountReducer, bankAccountFormState);
	const bankAccounts: Array<BankAccountI> = useSelector((state: RootState) => state.bankAccounts);
	
	useEffect(() => {
		(state.ammount !== '' && state.title !== '') ? setButtonStatus(true) : setButtonStatus(false);
	}, [state]);

	useEffect(() => {
		getInitialData(dispatchState, bankAccounts, cardId);
	}, [modalStatus]);

	const createBankAccountFunc = (): void => {
		createBankAccount(cardId, dispatch, bankAccounts, state);
		closeModal();
		notification('success', (cardId === '') ? 'New bank account has been created' : 'Changes were saved');
	};

	return(
		<Modal isVisible={modalStatus} style={styles.modalArea} onBackdropPress={closeModal}>
			<View style={styles.modal}>
				<TouchableOpacity style={styles.crossIcon} onPress={closeModal}>
					<CrossIcon/>
				</TouchableOpacity>
				<InputComponent
					title='Title'
					value={state?.title}
					keyboardType='default'
					changeValueFunc={(value: string) => {
						stateAction(dispatchState, 'add', 'title', value);
					}}
				/>
				<InputComponent
					title='Ammount'
					keyboardType='numeric'
					value={state?.ammount.toString()}
					changeValueFunc={(value: string) => {
						stateAction(dispatchState, 'add', 'ammount', value);
					}}
				/>
				<Picker
					selectedValue={state?.currency}
					onValueChange={(value: string) => {
						stateAction(dispatchState, 'add', 'currency', value);
					}}
				>
					{
						currency.map((el: string, index: number): ReactNode => {
							return(
								<Picker.Item label={el} value={el} key={index}/>
							);
						})
					}
				</Picker>
				<TouchableOpacity disabled={!buttonStatus} style={[styles.button, (!buttonStatus) ? {opacity: 0.5} : {opacity: 1}]} onPress={createBankAccountFunc}>
					<Text style={styles.buttonText}>{(cardId === '') ? 'Add bank account' : 'Save changes'}</Text>
				</TouchableOpacity>
			</View>
			<FlashMessage position="top" /> 
		</Modal>
	);
}

const styles = StyleSheet.create({
	modal: {
		height: 350,
		paddingTop: 30,
		borderRadius: 15,
		paddingVertical: 15,
		paddingHorizontal: 15,
		backgroundColor: 'white',
		justifyContent: 'space-between',
		width: Dimensions.get('window').width - 50,
	},
	button: {
		padding: 10,
		marginTop: 10,
		borderRadius: 10,
		backgroundColor: '#236F57',
	},
	modalArea: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	crossIcon: {
		left: '92.5%',
		top: '-2.5%',
		position: 'relative',
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
		fontSize: RFPercentage(2.2),
	},
});