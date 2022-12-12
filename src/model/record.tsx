import React from 'react';
import { TypeI } from '../types/recordTypes';
import { RecordI, RecordStoreI } from '../types/record';
import RestaurantIcon from '../../assets/icons/RestaurantIcon';

export const types: Array<TypeI> = [
	{
		data: [
			{
				color: [211, 0, 0],
				title: 'Bar, cafe',
				parent: 'Food and drinks',
				icon: <RestaurantIcon fill={'white'}/>,
			},
			{
				color: [211, 0, 0],
				title: 'Gorceries',
				parent: 'Food and drinks',
				icon: <RestaurantIcon fill={'white'}/>,
			},
			{
				color: [211, 0, 0],
				title: 'Restaurant, fast-food',
				parent: 'Food and drinks',
				icon: <RestaurantIcon fill={'white'}/>,
			}
		],
		color: [211, 0, 0],
		title: 'Food and drinks',
		icon: <RestaurantIcon fill={'white'}/>,
	},
	{
		data: [
			{
				title: 'Pharmacy',
				parent: 'Purchases',
				color: [0, 145, 200],
				icon: <RestaurantIcon fill={'white'}/>,
			},
			{
				title: 'Children',
				parent: 'Purchases',
				color: [0, 145, 200],
				icon: <RestaurantIcon fill={'white'}/>,
			},
			{
				color: [0, 145, 200],
				parent: 'Purchases',
				title: 'House and garden',
				icon: <RestaurantIcon fill={'white'}/>,
			},
			{
				title: 'Pets',
				parent: 'Purchases',
				color: [0, 145, 200],
				icon: <RestaurantIcon fill={'white'}/>,
			},
			{
				title: 'Stationery',
				parent: 'Purchases',
				color: [0, 145, 200],
				icon: <RestaurantIcon fill={'white'}/>,
			},
			{
				color: [0, 145, 200],
				parent: 'Purchases',
				title: 'Beauty and health',
				icon: <RestaurantIcon fill={'white'}/>,
			},
			{
				color: [0, 145, 200],
				parent: 'Purchases',
				title: 'Clothes and shoes',
				icon: <RestaurantIcon fill={'white'}/>,
			},
			{
				title: 'Recreation',
				parent: 'Purchases',
				color: [0, 145, 200],
				icon: <RestaurantIcon fill={'white'}/>,
			},
			{
				title: 'Gifts',
				parent: 'Purchases',
				color: [0, 145, 200],
				icon: <RestaurantIcon fill={'white'}/>,
			}
		],
		title: 'Purchases',
		color: [0, 145, 200],
		icon: <RestaurantIcon fill={'white'}/>,
	},
	{
		data: [
			{
				title: 'Rent',
				color: [200, 145, 0],
				parent: 'Accommodation',
				icon: <RestaurantIcon fill={'white'}/>,
			},
			{
				title: 'Mortgage',
				color: [200, 145, 0],
				parent: 'Accommodation',
				icon: <RestaurantIcon fill={'white'}/>,
			},
			{
				color: [200, 145, 0],
				parent: 'Accommodation',
				title: 'Property insurance',
				icon: <RestaurantIcon fill={'white'}/>,
			},
			{
				color: [200, 145, 0],
				parent: 'Accommodation',
				title: 'Maintenance, repair',
				icon: <RestaurantIcon fill={'white'}/>,
			},
			{
				title: 'Services',
				color: [200, 145, 0],
				parent: 'Accommodation',
				icon: <RestaurantIcon fill={'white'}/>,
			},
			{
				color: [200, 145, 0],
				parent: 'Accommodation',
				title: 'Communal payments',
				icon: <RestaurantIcon fill={'white'}/>,
			}
		],
		color: [200, 145, 0],
		title: 'Accommodation',
		icon: <RestaurantIcon fill={'white'}/>,
	},
];

export const recordFormState: RecordI = {
	id: '',
	type: '',
	date: '',
	color: [],
	comment: '',
	ammount: '',
	bankAccountId: '',
	recordType: 'income',
};

export const recordStore: RecordStoreI = {
	'Food and drinks': [
		{
			'color': [211, 0, 0],
			'ammount': '232', 
			'bankAccountId': '1', 
			'comment': '', 
			'date': '2022-12-10', 
			'id': '9ef17e8d-950d-4d9a-9c94-81f65904e7ea', 
			'recordType': 'outcome', 
			'type': 'Restaurant, fast-food',
		},
		{
			'color': [211, 0, 0],
			'ammount': '12', 
			'bankAccountId': '1', 
			'comment': '', 
			'date': '2022-12-10', 
			'id': 'faae2d42-9a8a-4155-ac44-7f67b55c0bdd', 
			'recordType': 'outcome', 
			'type': 'Bar, cafe'
		}
	],
	'Purchases': [
		// {
		// 	'color': [0, 145, 200],
		// 	'ammount': '324', 
		// 	'bankAccountId': '2', 
		// 	'comment': '', 
		// 	'date': '2022-12-10', 
		// 	'id': '9126275a-8a72-4ecc-bb3e-71053ac6c364', 
		// 	'recordType': 'outcome', 
		// 	'type': 'Children'
		// },
		// {
		// 	'color': [0, 145, 200],
		// 	'ammount': '242', 
		// 	'bankAccountId': '1', 
		// 	'comment': '', 
		// 	'date': '2022-12-10', 
		// 	'id': '2c2fc7a5-90d4-47ac-a4cf-390b19f4c910', 
		// 	'recordType': 'outcome', 
		// 	'type': 'Pets'
		// }
	],
	'Accommodation': []
};

export const recordTypes: Array<string> = ['Income', 'Outcome'];