import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useOrderStore } from '../store/useOrderStore';
import { 
	StyleSheet,
	View,
	FlatList,
  ActivityIndicator,
} from 'react-native';
import OrderCard from '../components/Order/OrderCard';

export default function OrdersScreen() {
  const { items, loading, refreshing, getUserOrders } = useOrderStore();

  const fetchOrders = useCallback(() => {
    getUserOrders();

  }, [getUserOrders]);

  useFocusEffect(fetchOrders);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#7b7b7b" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={fetchOrders}
        refreshing={refreshing}
        data={items}
        renderItem={({ item }) => <OrderCard { ...item} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		flexDirection: 'column',
    justifyContent: 'center',
		alignItems: 'center',
    backgroundColor: '#fff',
  },
});