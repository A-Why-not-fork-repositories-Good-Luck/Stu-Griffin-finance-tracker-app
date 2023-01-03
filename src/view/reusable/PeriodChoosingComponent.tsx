import Modal from 'react-native-modal';
import 'react-native-get-random-values';
import { RFPercentage } from 'react-native-responsive-fontsize';
import React, { useState, ReactElement, useEffect } from 'react';
import { PeriodChoosingComponentPropsI } from '../../types/Times';
import { StyleSheet, TouchableOpacity, View, Dimensions, Text } from 'react-native';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export default function PeriodChoosingComponent({modalStatus, closeModal, saveChanges}: PeriodChoosingComponentPropsI): ReactElement {
	const [type, setType] = useState<string>('');
	const [endDate, setEndDate] = useState<string>('');
	const [date, setDate] = useState<Date>(new Date());
	const [startDate, setStartDate] = useState<string>('');
	const [buttonStatus, setButtonStatus] = useState<boolean>(false);
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
		setDatePickerShowStatus(false);
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
		height: Dimensions.get('window').height - 525,
	},
	title: {
		color: 'gray',
		fontSize: RFPercentage(2),
	},
	input: {
		color: 'black',
		borderColor: 'gray',
		borderBottomWidth: 1,
		fontSize: RFPercentage(2),
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
		color: 'white',
		textAlign: 'center',
		fontSize: RFPercentage(2.5),
	},
});