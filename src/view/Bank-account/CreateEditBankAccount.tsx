import { v4 as uuidv4 } from 'uuid';
import Modal from 'react-native-modal';
import 'react-native-get-random-values';
import { changeBalance } from '../../redux/balance';
import { Picker } from '@react-native-picker/picker';
import FlashMessage from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';
import CrossIcon from '../../../assets/icons/CrossIcon';
import InputComponent from '../reusable/InputComponent';
import { showMessage } from 'react-native-flash-message';
import { AppDispatch, RootState } from '../../types/redux';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { bankAccountReducer } from '../../controller/BankAccount';
import { currency, bankAccountFormState } from '../../model/bankAccount';
import { addBankAccount, rewriteBankAccounts } from '../../redux/bankAccount';
import { CreateEditBankAccountPropsI, BankAccountI } from '../../types/BankAccount';
import { StyleSheet, TouchableOpacity, View, Dimensions, Text } from 'react-native';
import React, { useReducer, ReactNode, useEffect, ReactElement, useState } from 'react';

export default function CreateEditBankAccount({modalStatus, closeModal, cardId}: CreateEditBankAccountPropsI): ReactElement {
	const storeDispatch: AppDispatch = useDispatch();
	const [buttonStatus, setButtonStatus] = useState<boolean>(false);
	const bankAccounts = useSelector((state: RootState) => state.bankAccounts);
	const [state, dispatch] = useReducer(bankAccountReducer, bankAccountFormState);
	
	useEffect(() => {
		(state.ammount !== '' && state.title !== '') ? setButtonStatus(true) : setButtonStatus(false);
	}, [state]);

	useEffect(() => {
		getInitialData();
	}, [modalStatus]);

	const getInitialData = () => {
		const foundBankAccount: BankAccountI|undefined = bankAccounts.find((el: BankAccountI) => el.id === cardId);
		dispatch({
			type: 'add',
			payload: {
				key: 'title',
				value: foundBankAccount?.title || '',
			}
		});
		dispatch({
			type: 'add',
			payload: {
				key: 'ammount',
				value: foundBankAccount?.ammount || '',
			}
		});
		dispatch({
			type: 'add',
			payload: {
				key: 'id',
				value: foundBankAccount?.id || uuidv4(),
			}
		});
		dispatch({
			type: 'add',
			payload: {
				key: 'currency',
				value: foundBankAccount?.currency || currency[0],
			}
		});
	};

	const createBankAccountFunc = (): void => {
		(cardId === '') ? storeDispatch(addBankAccount(state)) : storeDispatch(rewriteBankAccounts(state));
		storeDispatch(changeBalance({
			date: JSON.parse(JSON.stringify(new Date())).split('T')[0],
			balance: bankAccounts.reduce((res: number, el: BankAccountI): number => res + +el.ammount, 0) + +state.ammount,
		}));
		closeModal();
		showMessage({
			type: 'success',
			message: (cardId === '') ? 'New bank account has been created' : 'Changes were saved',
		});
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
						dispatch({
							type: 'add',
							payload: {
								value: value,
								key: 'title',
							}
						});
					}}
				/>
				<InputComponent
					title='Ammount'
					keyboardType='numeric'
					value={state?.ammount.toString()}
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
				<Picker
					selectedValue={state?.currency}
					onValueChange={(value: string) => {
						dispatch({
							type: 'add',
							payload: {
								value: value,
								key: 'currency',
							}
						});
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