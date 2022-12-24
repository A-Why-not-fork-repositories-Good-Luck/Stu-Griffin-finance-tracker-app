import Modal from 'react-native-modal';
import 'react-native-get-random-values';
import React, { useState, ReactElement, useEffect } from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { StyleSheet, TouchableOpacity, View, Dimensions, Text } from 'react-native';

interface PropsI {
	modalStatus: boolean;
	closeModal: () => void;
	saveChanges: (startDate: string, endDate: string) => void;
}

export default function PeriodChoosingComponent({modalStatus, closeModal, saveChanges}: PropsI): ReactElement {
	const [type, setType] = useState<string>('');
	const [endDate, setEndDate] = useState<string>('');
	const [date, setDate] = useState<Date>(new Date());
	const [startDate, setStartDate] = useState<string>('');
	const [buttonStatus, setButtonStatus] = useState(false);
	const [datePickerShowStatus, setDatePickerShowStatus] = useState<boolean>(false);

	useEffect(() => {
		setButtonStatus(endDate !== '' && startDate !== '' && startDate <= endDate);
	}, [endDate, startDate]);

	const createRecordFunc = (): void => {
		setType('');
		closeModal();
		setEndDate('');
		setStartDate('');
		setDate(new Date());
		setButtonStatus(false);
		setDatePickerShowStatus(false);
		saveChanges(startDate, endDate);
	};

	const setDateFunc = (event: DateTimePickerEvent, date: Date|undefined): void => {
		if(date) {
			switch(event.type) {
			case 'set':
				setDate(date);
				switch(type) {
				case 'start':
					setStartDate(JSON.parse(JSON.stringify(date)).split('T')[0]);
					break;
				case 'end':
					setEndDate(JSON.parse(JSON.stringify(date)).split('T')[0]);
					break;
				default:
					break;
				}
				break;
			default:
				break;
			}
		}
		setDatePickerShowStatus(false);
	};

	return(
		<Modal
			isVisible={modalStatus}
			style={styles.modalArea}
		>
			<View style={styles.modal}>
				<TouchableOpacity onPress={() => {
					setType('start');
					setDatePickerShowStatus(true);
				}}>
					<Text style={styles.title}>Start date</Text>
					<Text style={styles.input}>{startDate}</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {
					setType('end');
					setDatePickerShowStatus(true);
				}}>
					<Text style={styles.title}>End date</Text>
					<Text style={styles.input}>{endDate}</Text>
				</TouchableOpacity>
				<TouchableOpacity disabled={!buttonStatus} style={[styles.button, (!buttonStatus) ? {opacity: 0.5} : {opacity: 1}]} onPress={createRecordFunc}>
					<Text style={styles.buttonText}>Save record</Text>
				</TouchableOpacity>
			</View>
			{
				(datePickerShowStatus) &&
				<RNDateTimePicker
					value={date}
					display="default"
					onChange={setDateFunc}
					maximumDate={new Date()}
				/>
			}
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
		justifyContent: 'space-between',
		width: Dimensions.get('window').width - 80,
		height: Dimensions.get('window').height - 550,
	},
	title: {
		fontSize: 15,
		color: 'gray',
	},
	input: {
		fontSize: 18,
		color: 'black',
		borderColor: 'gray',
		borderBottomWidth: 1,
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
	buttonText: {
		fontSize: 20,
		color: 'white',
		textAlign: 'center',
	},
});