import { User, Order } from './types';

export const OrdersData: Order[] = [
	{
		id: 432423423,
		date: '17 de fevereiro',
		paymentFormat: 'Pix',
		products: [
			{
				id: 5532234,
				status: 'Entregue',
				image: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
				quantity: 2,
			},
			{
				id: 858568756,
				status: 'Entregue',
				image: 'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp',
				quantity: 1,
			}
		]
	},
	{
		id: 98977,
		date: '15 de fevereiro',
		paymentFormat: 'Cartão de crédito',
		products: [
			{
				id: 4141,
				status: 'Entregue',
				image: 'https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp',
				quantity: 2,
			}
		]
	},
	{
		id: 3232,
		date: '14 de janeiro',
		paymentFormat: 'Pix',
		products: [
			{
				id: 33312,
				status: 'Entregue',
				image: 'https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp',
				quantity: 2,
			}
		]
	},
	{
		id: 666554,
		date: '12 de janeiro',
		paymentFormat: 'Pix',
		products: [
			{
				id: 9898,
				status: 'Entregue',
				image: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
				quantity: 2,
			},
			{
				id: 434,
				status: 'Entregue',
				image: 'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp',
				quantity: 1,
			}
		]
	},
];

export const UserData: User = {
	name: 'João da Silva',
	cpf: '404.999.423.99-99',
	nickname: 'João',
	address: 'Rua padre duarte, 289',
	email: 'joaosilva@gmail.com',
	phone: '(11) 99999-9999',
	password: '********',
};