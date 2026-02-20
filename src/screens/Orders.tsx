import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';

import { 
	StyleSheet,
	View,
	FlatList,
  SectionList,
  ActivityIndicator,
} from 'react-native';

import { getUserOrders } from '../store/slices/orderSlice';

import OrderCard from '../components/Order/OrderCard';

export default function OrdersScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, refreshing } = useSelector((state: RootState) => state.order);
  
  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

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
        onRefresh={() => { dispatch(getUserOrders()) }}
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