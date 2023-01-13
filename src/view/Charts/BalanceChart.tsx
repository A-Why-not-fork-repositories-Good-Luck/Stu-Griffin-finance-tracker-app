import { useSelector } from "react-redux";
import { RootState } from "../../types/redux";
import { LineChart } from "react-native-chart-kit";
import SettingIcon from "../../../assets/icons/SettingIcon";
import { DateI, BalanceChartDataI } from "../../types/Chart";
import { RFPercentage } from "react-native-responsive-fontsize";
import React, { useState, useEffect, ReactElement } from "react";
import { BankAccountBackUpI } from "../../types/bankAccountBackUp";
import PeriodChoosingComponent from "../reusable/PeriodChoosingComponent";
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from "react-native";
import { createBalanceData, constructDate, getBalance, errorMsg } from "../../controller/Chart";

const width = Dimensions.get("window").width;

export default function BalanceChart(): ReactElement {
	const [date, setDate] = useState<DateI>({
		end: "",
		start: "",
	});
	const [label, setLabel] = useState<Array<string>>([""]);
	const [dataset, setDataset] = useState<Array<number>>([0]);
	const [modalStatus, setModalStatus] = useState<boolean>(false);
	const bankAccountBackUps: Array<BankAccountBackUpI> = useSelector((state: RootState) => state.bankAccountsBackUp);

	useEffect(() => {
		setDate(constructDate());
	}, []);

	useEffect(() => {
		const { labels, datasets }: BalanceChartDataI = createBalanceData(bankAccountBackUps, date);
		setLabel(labels);
		setDataset(datasets);
	}, [bankAccountBackUps, date]);
	
	return(
		<View style={styles.card}>
			<View style={styles.area}>
				<Text style={styles.title}>Balance trend</Text>
				<TouchableOpacity onPress={() => setModalStatus(true)} style={styles.settingBox}>
					<SettingIcon width={20} height={20} fill={"black"}/>
				</TouchableOpacity>
			</View>
			<View style={styles.area}>
				<View>
					<Text style={styles.infoTitle}>Today</Text>
					<Text style={styles.infoValue}>{getBalance(bankAccountBackUps)} UAH</Text>
				</View>
			</View>
			{
				(dataset.length !== 0 && label.length !== 0) ?
					<LineChart
						fromZero={true}
						bezier
						data={{
							labels: label,
							datasets: [
								{
									data: dataset,
									color:() => "#0090E7",
								}
							],
						}}
						style={styles.lineChart}
						height={256}
						chartConfig={{
							strokeWidth: 2,
							barPercentage: 0.5,
							color: () => "black",
							backgroundGradientTo: "white",
							backgroundGradientFrom: "white",
							useShadowColorFromDataset: true,
					
						}}
						width={width-45}
						withVerticalLines={false}
						verticalLabelRotation={30}
					/> :
					<Text style={errorMsg}>You have no data in balances</Text>
			}
			<PeriodChoosingComponent
				closeModal={() => {
					setModalStatus(false);
				}}
				modalStatus={modalStatus}
				saveChanges={(startDate: string, endDate: string) => {
					setDate({
						end: endDate,
						start: startDate,
					});
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	area: {
		marginTop: 20,
		width: width-45,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	card: {
		padding: 10,
		width: width-25,
		borderRadius: 10,
		marginVertical: 10,
		alignItems: "center", 
		justifyContent: "center", 
		backgroundColor: "white",	
	},
	title: {
		fontWeight: "bold",
		fontSize: RFPercentage(3.5),
	},
	lineChart: {
		padding: 10,
		borderRadius: 10,
		backgroundColor: "white",
	},
	infoTitle: {
		color: "gray",
		fontSize: RFPercentage(2),
	},
	infoValue: {
		fontWeight: "bold",
		fontSize: RFPercentage(2.5),
	},
	settingBox: {
		padding: 5,
		borderWidth: 1,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
	},
});