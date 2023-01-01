import Modal from 'react-native-modal';
import 'react-native-get-random-values';
import { types } from '../../model/record';
import React, { ReactElement } from 'react';
import CrossIcon from '../../../assets/icons/CrossIcon';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { StyleSheet, TouchableOpacity, View, Dimensions, Text, SectionList } from 'react-native';
import { RecordTypeItemI, RecordTypeSectionHeaderI, RecordTypesListPropsI } from '../../types/Record';

export default function RecordTypesList({modalStatus, closeModal, saveChanges, saveKey}: RecordTypesListPropsI): ReactElement {
	const Item = (el: RecordTypeItemI): ReactElement => {
		return(
			<TouchableOpacity style={styles.elTypeCard} onPress={() => {
				saveKey(el.title.parent);
				saveChanges('type', el.title.title);
				saveChanges('color', el.title.color);
				saveChanges('parentType', el.title.parent);
				closeModal();
			}}>
				<View style={[styles.elTypeIcon, {backgroundColor: `rgb(${el.title.color[0]}, ${el.title.color[1]}, ${el.title.color[2]})`}]}>
					{el.title.icon}
				</View>
				<Text style={styles.elTypeTitle}>{el.title.title}</Text>
			</TouchableOpacity>
		);
	};

	const sectionHeader = (el: RecordTypeSectionHeaderI): ReactElement => {
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
		marginLeft: 10,
		fontWeight: 'bold',
		fontSize: RFPercentage(2),
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
		borderRadius: 100,
		alignItems: 'center',
		justifyContent: 'center',
	},
	elTypeTitle: {
		marginLeft: 10,
		fontSize: RFPercentage(2),
	},
});