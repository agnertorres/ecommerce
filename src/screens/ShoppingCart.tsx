import { StyleSheet, Text, View, FlatList } from 'react-native';
import { ShoppingBag } from 'lucide-react-native';
import { useCartSummary } from '../store/useShoppingCartStore';
import Product from '../components/ShoppingCart/Product';
import Checkout from '../components/ShoppingCart/Checkout';

export default function ShoppingCartScreen() {
  const { products } = useCartSummary();

  if(products.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10, backgroundColor: '#fff' }}>
        <ShoppingBag size={50} strokeWidth={1.3} color={'#262626'} />
        <View>
          <Text style={{ fontSize: 20, color: '#262626' }}>Carrinho vazio</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Produtos</Text>
          </View>
        }
        data={products}
        renderItem={({ item }) => <Product {...item}/>}
        keyExtractor={item => item.id.toString()}
        style={styles.flatList}
      />
      <Checkout />
    </View>
   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  flatList: {
    flex: 1,
    width: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderBottomWidth: .3,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  title: {
    fontSize: 20,
  },
});