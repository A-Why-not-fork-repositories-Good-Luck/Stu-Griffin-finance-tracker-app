import Modal from 'react-native-modal';
import 'react-native-get-random-values';
import { types } from '../../model/record';
import { TypeItem } from '../../types/recordTypes';
import React, { ReactElement, ReactNode } from 'react';
import CrossIcon from '../../../assets/icons/CrossIcon';
import { StyleSheet, TouchableOpacity, View, Dimensions, Text, SectionList } from 'react-native';

interface ItemI {
	title: {
		title: string;
		parent: string;
		icon: ReactNode;
		color: Array<number>;
	}
}

interface PropsI {
	modalStatus: boolean;
	closeModal: () => void;
	saveKey: (el: string) => void;
	saveChanges: (key: string, value: string|Array<number>) => void;
}

interface SectionHeaderI {
	section: {
		title: string;
		icon: ReactNode;
		color: Array<number>;
		data: Array<TypeItem>;
	}
}

export default function RecordTypesList({modalStatus, closeModal, saveChanges, saveKey}: PropsI): ReactElement {
	const Item = (el: ItemI) => {
		return(
			<TouchableOpacity style={styles.elTypeCard} onPress={() => {
				saveKey(el.title.parent);
				saveChanges('type', el.title.title);
				saveChanges('color', el.title.color);
				closeModal();
			}}>
				<View style={[styles.elTypeIcon, {backgroundColor: `rgb(${el.title.color[0]}, ${el.title.color[1]}, ${el.title.color[2]})`}]}>
					{el.title.icon}
				</View>
				<Text style={styles.elTypeTitle}>{el.title.title}</Text>
			</TouchableOpacity>
		);
	};

	const sectionHeader = (el: SectionHeaderI) => {
		return(
			<View style={styles.typeCard}>
				<View style={[styles.typeIcon, {backgroundColor: `rgb(${el.section.color[0]}, ${el.section.color[1]}, ${el.section.color[2]})`}]}>
					{el.section.icon}
				</View>
				<Text style={styles.typeTitle}>{el.section.title}</Text>
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
				<SectionList
					sections={types}
					renderSectionHeader={sectionHeader}
					renderItem={({ item }) => <Item title={item} />}
					keyExtractor={(item, index) => (item.title + index)}
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
		borderTopWidth: 1,
		marginVertical: 10,
		paddingVertical: 10,
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 10,
		borderBottomWidth: 1,
	},
	typeIcon: {
		width: 50,
		height: 50,
		// borderWidth: 2,
		borderRadius: 100,
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalArea: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	typeTitle: {
		fontSize: 20,
		marginLeft: 10,
		fontWeight: 'bold',
	},
	crossIcon: {
		left: '92.5%',
		top: '-2.5%',
		position: 'relative',
	},
	elTypeCard: {
		marginVertical: 10,
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 10,
		marginLeft: 30
	},
	elTypeIcon: {
		width: 40,
		height: 40,
		// borderWidth: 2,
		borderRadius: 100,
		alignItems: 'center',
		justifyContent: 'center',
	},
	elTypeTitle: {
		fontSize: 17,
		marginLeft: 10,
	},
});