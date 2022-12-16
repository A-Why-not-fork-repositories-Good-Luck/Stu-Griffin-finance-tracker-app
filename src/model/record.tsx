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
	'Purchases': [],
	'Accommodation': [],
	'Food and drinks': [],
};

export const recordTypes: Array<string> = ['Income', 'Outcome'];