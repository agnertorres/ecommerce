export interface User {
	id: string,
	name: string;
	cpf: string;
	nickname: string;
	email: string;
	phone: string;
	password: string;
	imageUrl: string;
	addresses?: Address[];
	paymentMethods? : PaymentMethod[];
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

export interface PaymentMethod {
	id: string;
	lastFourDigits: string;
	brand: string;
	token: string;
	expirationMonth: string;
  expirationYear: string;
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

export interface UserFormData {
	name: string;
	cpf: string;
	nickname: string;
	email: string;
	phone: string;
	password?: string;
	imageUrl: string;
}

export interface PaymentMethodFormData {
	brand: string;
	creditCardNumber: string;
	expirationYear: string;
	expirationMonth: string;
	cvv: string;
	name: string;
}