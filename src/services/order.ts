import { OrdersData } from "../mock";
import { Order } from "../types";

type userToken = string;

export function getOrders(userToken: userToken): Promise<{ data: Order[] }> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			userToken ? resolve({ data: OrdersData }) : reject('Token inválido');
		}, 1000);
	})
}

export function getOrderById(id: number) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			id
			? resolve({ data: OrdersData.find(order => order.id === id) })
			: reject({ message: 'Pedido não encontrado'});
		}, 1000);
	})
};