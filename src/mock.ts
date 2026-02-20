import { User, Order } from './types';

export const OrdersData: Order[] = [
	{
		id: 432423423,
		date: '17 de fevereiro',
		paymentMethod: 'Pix',
		paymentStatus: 'approved',
		shipping: {
			address: 'Rua padre duarte, 125',
			city: 'Araraquara, SP',
			price: 0
		},
		totalPrice: 30,
		products: [
			{
				id: 5532234,
				status: 'Entregue',
				image: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
				quantity: 2,
				price: 20
			},
			{
				id: 858568756,
				status: 'Entregue',
				image: 'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp',
				quantity: 1,
				price: 10
			}
		]
	},
	{
		id: 98977,
		date: '15 de fevereiro',
		paymentMethod: 'Cartão de crédito',
		paymentStatus: 'approved',
		shipping: {
			address: 'Rua padre duarte, 125',
			city: 'Araraquara, SP',
			price: 20
		},
		totalPrice: 15,
		products: [
			{
				id: 4141,
				status: 'Entregue',
				image: 'https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp',
				quantity: 2,
				price: 15
			}
		]
	},
	{
		id: 3232,
		date: '14 de janeiro',
		paymentMethod: 'Pix',
		paymentStatus: 'pending',
		shipping: {
			address: 'Avenida São Carlos, 223',
			city: 'São Carlos, SP',
			price: 20
		},
		totalPrice: 50,
		products: [
			{
				id: 33312,
				status: 'Entregue',
				image: 'https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp',
				quantity: 2,
				price: 50
			}
		]
	},
	{
		id: 666554,
		date: '12 de janeiro',
		paymentMethod: 'Pix',
		paymentStatus: 'not_approved',
		shipping: {
			address: 'Avenida Matarazzo, 167',
			city: 'São Paulo, SP',
			price: 20
		},
		totalPrice: 76,
		products: [
			{
				id: 9898,
				status: 'Entregue',
				image: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
				quantity: 2,
				price: 56
			},
			{
				id: 434,
				status: 'Entregue',
				image: 'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp',
				quantity: 1,
				price: 20
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