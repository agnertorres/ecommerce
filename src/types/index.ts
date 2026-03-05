export interface User {
	id: string,
	name: string;
	cpf: string;
	nickname: string;
	email: string;
	phone: string;
	password: string;
	addresses?: Address[];
}

export interface Address {
  id: string;
  city: string;
  complement?: string;
  createdAt?: Date;
  isDefault: boolean;
  number: string;
  state: string;
  street: string;
  userId: string;
  zipcode: string;
}

export interface Product {
	id: string;
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
	id: string;
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

export type AddressFormData = Omit<Address, 'id' | 'createdAt' | 'userId'>;

export interface PasswordFormData {
	currentPassword: string;
	newPassword: string;
}