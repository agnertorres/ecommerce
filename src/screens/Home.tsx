import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useProductStore } from '../store/useProductStore';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import ProductItem from '../components/Home/ProductItem';

export default function HomeScreen({ route }) {
  const {
    items,
    loading,
    refreshing,
    fetchProductsByCategory, 
    resetProducts,
  } = useProductStore();

  const { name } = route;

  const fetchProducts = useCallback(() => {
    fetchProductsByCategory(name);

    return () => {
      resetProducts();
    };
  }, [name]);

  useFocusEffect(fetchProducts);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
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
    justifyContent: 'space-between',
    marginBottom: 15,
  },
});