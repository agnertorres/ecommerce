import { useEffect, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, ActivityIndicator, Text } from 'react-native';
import { white, lightGray } from '../components/ui/colors';
import { useStore } from '../store';
import Header from '../components/Home/Header';
import ProductDetail from '../components/Product/ProductDetail';
import { useFocusEffect } from '@react-navigation/native';

export default function ProductDetailScreen({ route }) {
  const {
    loadingSelectedProduct,
    selectedProduct,
    fetchProductById,
    cleanSelectedProduct,
  } = useStore.product();

  const { id } = route.params;

  useFocusEffect(useCallback(() => {
    fetchProductById(id);

    return () => {
      cleanSelectedProduct();
    }
  }, [id, fetchProductById]));

  if (loadingSelectedProduct) {
    return (
      <ProductContainer>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: white }}>
          <ActivityIndicator size="large" color={lightGray} />
        </View>
      </ProductContainer>
    );
  }

  if (!selectedProduct?.id) {
    return (
      <ProductContainer>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: white }}>
          <Text>Produto selecionado não encontrado</Text>
        </View>
      </ProductContainer>
    )
  }

  return (
    <ProductContainer>
      <ProductDetail product={selectedProduct} />
    </ProductContainer>
  )
}

const ProductContainer = ({ children }: { children: React.ReactNode} ) => {
  const safeAreaInsets = useSafeAreaInsets();
  return (
  <View style={{ flex: 1, backgroundColor: white }}>
    <Header
      showBackButton={true}
      style={{
        paddingTop: safeAreaInsets.top,
        height: (Number(100 + safeAreaInsets.top))
      }}
    />
    {children}
  </View>
  );
}