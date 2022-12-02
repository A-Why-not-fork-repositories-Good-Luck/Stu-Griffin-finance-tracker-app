import React from 'react';
import Modal from 'react-native-modal';
import { types } from '../model/record';
import 'react-native-get-random-values';
import { TypeI } from '../types/recordTypes';
import CrossIcon from '../../assets/icons/CrossIcon';
import { FlatList } from 'react-native-gesture-handler';
import { StyleSheet, TouchableOpacity, View, Dimensions, Text } from 'react-native';

interface PropsI {
	modalStatus: boolean;
	closeModal: () => void;
	saveChanges: (key: string, value: string) => void;
}

interface CardItemI {
	item: TypeI
}

export default function RecordTypesList({modalStatus, closeModal, saveChanges}: PropsI) {
	const renderCardItem = ({ item }: CardItemI) => {
		return (
			<TouchableOpacity style={styles.typeCard} onPress={() => {
				saveChanges('type', item.title);
				closeModal();
			}}>
				<View style={styles.typeIcon}>
					{item.icon}
				</View>
				<Text style={styles.typeTitle}>{item.title}</Text>
			</TouchableOpacity>
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
				<FlatList
					data={types}
					renderItem={renderCardItem}
					keyExtractor={(item: TypeI, index: number) => index.toString()}
				/>
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
		width: Dimensions.get('window').width - 80,
		height: Dimensions.get('window').height - 150,
	},
	typeCard: {
		marginVertical: 10,
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 10,
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
	modalArea: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	typeTitle: {
		fontSize: 17,
		marginLeft: 10,
	},
	crossIcon: {
		left: '92.5%',
		top: '-2.5%',
		position: 'relative',
	},
});