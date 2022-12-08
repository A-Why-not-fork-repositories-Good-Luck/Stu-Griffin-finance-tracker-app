import { v4 as uuidv4 } from 'uuid';
import Modal from 'react-native-modal';
import 'react-native-get-random-values';
import { useDispatch } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import CrossIcon from '../../assets/icons/CrossIcon';
import { addBankAccount } from '../redux/bankAccount';
import InputComponent from './reusable/InputComponent';
import { bankAccountReducer } from '../controller/bankAccount';
import React, { useReducer, ReactNode, useEffect } from 'react';
import { currency, bankAccountFormState } from '../model/bankAccount';
import { StyleSheet, TouchableOpacity, View, Dimensions, Text } from 'react-native';

interface PropsI {
	modalStatus: boolean;
	closeModal: () => void;
}

export default function CreateBankAccount({modalStatus, closeModal}: PropsI) {
	const storeDispatch = useDispatch();
	const [state, dispatch] = useReducer(bankAccountReducer, bankAccountFormState);

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
				key: 'currency',
				value: currency[0],
			}
		});
	}, [modalStatus]);

	const clearState = () => {
		dispatch({
			type: 'add',
			payload: {
				value: '',
				key: 'ammount',
			}
		});
		dispatch({
			type: 'add',
			payload: {
				value: '',
				key: 'title',
			}
		});
		dispatch({
			type: 'add',
			payload: {
				value: '',
				key: 'currency',
			}
		});
	};

	const createBankAccountFunc = () => {
		storeDispatch(addBankAccount(state));
		clearState();
		closeModal();
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
				<TouchableOpacity style={styles.button} onPress={createBankAccountFunc}>
					<Text style={styles.buttonText}>Add bank account</Text>
				</TouchableOpacity>
			</View>
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
		fontSize: 20,
		color: 'white',
		textAlign: 'center',
	},
});