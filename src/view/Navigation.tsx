import MainPage from "./MainPage";
import React, { ReactElement } from "react";
import CreateRecord from "./Record/CreateRecord";
import FlashMessage from "react-native-flash-message";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function Navigation(): ReactElement {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					options={
						{
							headerShown:false
						}
					}
					name="main-page"
					component={MainPage}
				/>
				<Stack.Screen
					options={
						{
							title: "Add record",
						}
					}
					component={CreateRecord}
					name="create-record-page"
				/>
			</Stack.Navigator>
			<FlashMessage position="top" />
		</NavigationContainer>
	);
}

export default Navigation;