export interface User {
	id?: number,
	name: string;
	cpf: string;
	nickname: string;
	email: string;
	phone: string;
	password: string;
}

export interface Product {
	id: number;
	title: string;
	status: string; //precisa ir para a tabela order_items
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

export interface EditFieldProps { 
	field: string;
	value?: string;
}

export enum CategoryEnum {
	Eletrônicos = 'Eletrônicos',
	Casa = 'Casa',
	Esporte = 'Esporte',
	Música = 'Música',
	Moda = 'Moda',
	Beleza = 'Beleza',
}