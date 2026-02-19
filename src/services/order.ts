import { OrdersData } from "../mock";
import { Order } from "../types";

type userToken = string;

export function getOrders(userToken: userToken): Promise<{data: Order[]}> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			userToken ? resolve({ data: OrdersData }) : reject('Token inválido');
		}, 1500);
	})
}