export interface User {
	name: string;
	cpf: string;
	nickname: string;
	address: string;
	email: string;
	phone: string;
	password: string;
}

export interface Product {
	id: number;
	title: string;
	status: string;
	image: string;
	stock: number;
	price: number;
	category: CategoryEnum;
	shippingPrice: number;
}

export interface Shipping {
	address: string;
	city: string;
	price: number;
}

export interface Order {
	id: number;
	date: string;
	paymentMethod: string;
	paymentStatus: string;
	shipping: Shipping;
	products: Product[];
	totalPrice: number;
}

export interface Cartitem extends Product {
	quantity: number;
}

export enum CategoryEnum {
	Eletrônicos = 'Eletrônicos',
	Casa = 'Casa',
	Esporte = 'Esporte',
	Música = 'Música',
	Moda = 'Moda',
	Beleza = 'Beleza',
}