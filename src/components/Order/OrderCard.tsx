import { Order } from '../../types';
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import { white, blue, separator } from '../ui/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OrdersStackParamList } from '../../types/navigation';

import ProductList from './ProductList';
import Card from '../ui/Card';

export default function OrderCard({ id, date, products }: Order) {
	const navigation = useNavigation<NativeStackNavigationProp<OrdersStackParamList>>();

	const showOrderDetail = () => {
		navigation.navigate('OrderDetail', { id });
	}

	return (
		<TouchableOpacity style={styles.orderContainer} onPress={showOrderDetail}>
			<Card>
				<View style={styles.orderHeader}>
					<Text style={styles.title}>{date}</Text>
					<Text style={styles.showDetail}>ver detalhes</Text>
				</View>
				<View style={styles.orderContent}>
					<ProductList products={products} />
				</View>
			</Card>
		</TouchableOpacity>
	);
}
const styles = StyleSheet.create({
	orderContainer: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: white,
		alignItems: 'center',
		marginHorizontal: 20,
		marginTop: 20,

	},
	orderHeader: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		paddingBottom: 10,
	},
	title: {
		fontSize: 16,
		fontWeight: 500,
	},
	showDetail: {
		color: blue,
	},
	orderContent: {
		display: 'flex',
		width: '100%',
		borderTopWidth: 0.5,
		borderTopColor: separator,
	},
});