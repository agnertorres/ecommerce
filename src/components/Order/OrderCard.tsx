import { Order } from '../../types';
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';

import ProductList from './ProductList';

export default function OrderCard({ date, products }: Order) {
	return (
		<TouchableOpacity style={styles.orderContainer}>
			<View style={styles.orderHeader}>
				<Text style={styles.title}>{date}</Text>
				<Text style={styles.showDetail}>ver detalhes</Text>
			</View>
			<View style={styles.orderContent}>
				<ProductList products={products} />
			</View>
		</TouchableOpacity>
	);
}
const styles = StyleSheet.create({
	orderContainer: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: 'white',
		alignItems: 'center',
		marginHorizontal: 20,
		marginTop: 20,
		borderRadius: 5,
		shadowColor: '#2e2e2e',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3,
		elevation: 5,
	},
	orderHeader: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 15,
	},
	title: {
		fontSize: 16,
		fontWeight: 500,
	},
	showDetail: {
		color: '#007BFF',
	},
	orderContent: {
		display: 'flex',
		width: '100%',
		borderTopWidth: 0.5,
		borderTopColor: '#e7e7e7eb',
		paddingHorizontal: 10,
		paddingBottom: 10,
	},
});