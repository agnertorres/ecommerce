import { Product } from '../../types';
import {
	Text,
	View,
	Image,
	StyleSheet,
} from 'react-native';

interface ProductListProps {
	products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
	return (
		products.map((item: Product) => (
			<View key={item.id} style={styles.itemContainer}>
				<Image style={styles.itemImage} src={item.image} height={70} width={70} />
				<View style={styles.itemDescription}>
					<Text style={{ fontWeight: '600' }}>Produto ID: {item.id}</Text>
					<Text style={styles.itemStatus}>{item.status}</Text>
					<Text>Quantidade: {item.quantity}</Text>
				</View>
			</View>
		))
	);
}

const styles = StyleSheet.create({
	itemContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '100%',
		marginTop: 10,
	},
	itemImage: {
		borderWidth: .5,
		borderColor: '#ccc',
		borderRadius: 3,
	},
	itemDescription: {
		display: 'flex',
		flexDirection: 'column',
		gap: 2,
		marginLeft: 10,
	},
	itemStatus: {
		color: '#00a71f',
	}
});