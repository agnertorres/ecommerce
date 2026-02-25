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
	quantity: number;
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

export type OrderStackParamList = {
	OrdersList: undefined,
	OrderDetail: { id: number },
};

export type ProfileStackParamList = {
	Profile: undefined,
	EditProfile: {
		field: keyof User,
		value: string,
	},
	ChangePassword: undefined,
};

export type HomeStackParamList = {
	HomeTabSection: undefined,
	ProductDetail: {
		id: number,
	},
	EditProfile: {
		field: keyof User,
		value: string,
	},
};

export enum CategoryEnum {
	Eletrônicos = 'Eletrônicos',
	Casa = 'Casa',
	Esporte = 'Esporte',
	Música = 'Música',
	Moda = 'Moda',
	Beleza = 'Beleza',
}