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
}

export interface Order {
	id: number;
	date: string;
	paymentFormat: string;
	products: Product[];
}