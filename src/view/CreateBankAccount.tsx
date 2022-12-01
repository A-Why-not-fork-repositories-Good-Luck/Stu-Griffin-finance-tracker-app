import Modal from 'react-native-modal';
import 'react-native-get-random-values';
import { Picker } from '@react-native-picker/picker';
import CrossIcon from '../../assets/icons/CrossIcon';
import React, { useReducer, ReactNode } from 'react';
import InputComponent from './reusable/InputComponent';
import { bankAccountFormState } from '../model/bankAccount';
import { bankAccountReducer } from '../controller/bankAccount';
import { StyleSheet, TouchableOpacity, View, Dimensions, Text } from 'react-native';

interface PropsI {
	modalStatus: boolean;
	closeModal: () => void;
}

export default function CreateBankAccount({modalStatus, closeModal}: PropsI) {
	const [state, dispatch] = useReducer(bankAccountReducer, bankAccountFormState);

	return(
		<Modal isVisible={modalStatus} style={styles.modalArea}>
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
								key: 'title',
								value: value,
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
						['USD', 'EUR', 'UAH'].map((el: string, index: number): ReactNode => {
							return(
								<Picker.Item label={el} value={el} key={index}/>
							);
						})
					}
				</Picker>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>Add bank account</Text>
				</TouchableOpacity>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modal: {
		paddingTop: 30,
		borderRadius: 15,
		paddingVertical: 15,
		paddingHorizontal: 15,
		backgroundColor: 'white',
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