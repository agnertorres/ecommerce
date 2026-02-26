import { Order as OrderI } from '../../types';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { CreditCard, Truck } from 'lucide-react-native';
import { formatMoney } from '../../utils';
import { lightGreen, darkGray, lightGray, white, yellow, red, separator } from '../ui/colors';

import Card from '../ui/Card';
import ProductList from './ProductList';

type OrderDetailProps = {
	order: OrderI;
}

const paymentStatusEnum = {
	'approved': 'aprovado',
	'pending': 'pendente',
	'not_approved': 'não aprovado',
};

export default function OrderDetail({ order }: OrderDetailProps) {
	return (
		<ScrollView style={{ flex: 1, backgroundColor: white, padding: 16 }}>
			<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Pedido #{order.id}</Text>
			<Card style={{ marginTop: 20 }}>
				<Text style={{ color: lightGray, marginBottom: 10 }}>Realizado em {order.date}</Text>
				<View style={{
					borderTopWidth: 0.5,
					borderTopColor: separator
				}}>
					<View style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						marginTop: 10
					}}>
						<Text style={{ color: darkGray }}>{`Produtos (${order.products.length})`}</Text>
						<Text style={{ color: darkGray }}>{formatMoney(order.totalPrice)}</Text>
					</View>
					<View style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						marginTop: 10
					}}>
						<Text style={{ color: darkGray }}>Frete</Text>
						{
							order.shipping.price > 0
							? <Text style={{ color: darkGray }}>{formatMoney(order.shipping.price)}</Text>
							: <Text style={{ color: lightGreen }}>Grátis</Text>
						}
					</View>
				</View>
				<View style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					marginTop: 10,
					borderTopWidth: 0.5,
					borderTopColor: separator,
					paddingTop: 10,
				}}>
					<Text style={{ color: darkGray }}>Total</Text>
					<Text style={{ color: darkGray }}>{formatMoney(order.totalPrice + order.shipping.price)}</Text>
				</View>
			</Card>

			<Text style={{ fontSize: 16, fontWeight: '500', marginTop: 20 }}>Detalhes do pagamento</Text>
			<Card style={styles.paymentDetailContent}>
				<CreditCard size={35} strokeWidth={1.2} />
				<View>
					<Text style={{ color: darkGray }}>{`Total: ${formatMoney(order.totalPrice)}`}</Text>
					<Text style={{ color: darkGray, marginTop: 2 }}>Forma de pagamento: {order.paymentMethod}</Text>
					<Text style={[{ fontWeight: '500', marginTop: 4 }, styles[order.paymentStatus]]}>
						{paymentStatusEnum[order.paymentStatus]}
					</Text>
				</View>
			</Card>
			<Text style={{ fontSize: 16, fontWeight: '500', marginTop: 20 }}>Detalhes do envio</Text>
			<Card style={styles.paymentDetailContent}>
				<Truck size={35} strokeWidth={1.2} />
				<View>
					<Text style={{ color: darkGray }}>{order.shipping.address}</Text>
					<Text style={{ color: lightGray, marginTop: 2 }}>{order.shipping.city}</Text>
				</View>
			</Card>
			<Text style={{ fontSize: 16, fontWeight: '500', marginTop: 20 }}>Produtos</Text>
			<Card style={{ marginTop: 10 }}>
				<ProductList products={order.products} />
			</Card>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	paymentDetailContent: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		marginTop: 10
	},
	product: {
		flexDirection: 'row',
		marginVertical: 5,
		alignItems: 'center',
	},
	approved: {
		color: lightGreen,
	},
	pending: {
		color: yellow,
	},
	not_approved: {
		color: red,
	}
});