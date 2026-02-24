import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { useFocusEffect } from '@react-navigation/native';

import { getProductsByCategory, resetProducts } from '../store/slices/productSlice';

import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image } from 'react-native';
import ProductItem from '../components/Home/ProductItem';

export default function HomeScreen({ route }) {
  const dispatch = useDispatch<AppDispatch>();

  const { items, loading, refreshing } = useSelector((state: RootState) => state.product);
  const { name } = route;

  const fetchProducts = useCallback(() => {
    dispatch(getProductsByCategory(name));

    return () => {
      dispatch(resetProducts());
    };
  }, [dispatch, name]);

  useFocusEffect(fetchProducts);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#7b7b7b" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={fetchProducts}
        refreshing={refreshing}
        data={items}
        renderItem={({ item }) => <ProductItem product={item} />}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ padding: 10 }}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  productList: {
    flex: 1,
  },
  columnWrapper: {
    display: 'flex',
    justifyContent: 'space-between', // Espalha os cards uniformemente
    marginBottom: 15,
  },
});