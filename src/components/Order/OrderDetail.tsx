import { Order as OrderI } from '../../types';
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	FlatList,
	Image,
	ScrollView
} from 'react-native';
import { CreditCard, Truck } from 'lucide-react-native';

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
		<ScrollView style={{ flex: 1, backgroundColor: '#FFF', padding: 16 }}>
			<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Pedido #{order.id}</Text>
			

			<Card style={{ marginTop: 20 }}>
				<Text style={{ color: '#666', marginBottom: 10 }}>Realizado em {order.date}</Text>
				<View style={{
					borderTopWidth: 0.5,
					borderTopColor: '#e7e7e7eb'
				}}>
					<View style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						marginTop: 10
					}}>
						<Text style={{ color: '#242424' }}>Produtos - {order.products.length}</Text>
						<Text style={{ color: '#242424' }}>R$ {order.totalPrice}</Text>
					</View>
					<View style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						marginTop: 10
					}}>
						<Text style={{ color: '#242424' }}>Frete</Text>
						{
							order.shipping.price > 0
							? <Text style={{ color: '#242424' }}>R$ {order.shipping.price}</Text>
							: <Text style={{ color: '#00a71f' }}>Grátis</Text>
						}
					</View>
				</View>
				<View style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					marginTop: 10,
					borderTopWidth: 0.5,
					borderTopColor: '#e7e7e7eb',
					paddingTop: 10,
				}}>
					<Text style={{ color: '#242424' }}>Total</Text>
					<Text style={{ color: '#242424' }}>R$ {Number(order.totalPrice + order.shipping.price)}</Text>
				</View>
			</Card>

			<Text style={{ fontSize: 16, fontWeight: '500', marginTop: 20 }}>Detalhes do pagamento</Text>
			<Card style={styles.paymentDetailContent}>
				<CreditCard size={35} strokeWidth={1.2} />
				<View>
					<Text style={{ color: '#242424' }}>Total: R$ {order.totalPrice}</Text>
					<Text style={{ color: '#242424', marginTop: 2 }}>Forma de pagamento: {order.paymentMethod}</Text>
					<Text style={[{ fontWeight: '500', marginTop: 4 }, styles[order.paymentStatus]]}>
						{paymentStatusEnum[order.paymentStatus]}
					</Text>
				</View>
			</Card>
			<Text style={{ fontSize: 16, fontWeight: '500', marginTop: 20 }}>Detalhes do envio</Text>
			<Card style={styles.paymentDetailContent}>
				<Truck size={35} strokeWidth={1.2} />
				<View>
					<Text style={{ color: '#242424' }}>{order.shipping.address}</Text>
					<Text style={{ color: '#666', marginTop: 2 }}>{order.shipping.city}</Text>
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
		color: '#00a71f',
	},
	pending: {
		color: '#d8ae09'
	},
	not_approved: {
		color: '#cd0216',
	}
});