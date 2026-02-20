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
	status: string;
	image: string;
	quantity: number;
	price: number;
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

export type OrderStackParamList = {
	OrdersList: undefined;
	OrderDetail: { id: number };
};