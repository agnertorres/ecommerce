import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Product } from '../types';
import { View, ActivityIndicator } from 'react-native';
import { white, lightGray } from '../components/ui/colors';
import { getProductById } from '../services/product';
import Header from '../components/Home/Header';

import ProductDetail from '../components/Product/ProductDetail';

export default function ProductDetailScreen({ route }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState<Product | null>(null);

  const safeAreaInsets = useSafeAreaInsets();

  const { id } = route.params;

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const { data }: any = await getProductById(Number(id));
        setProduct(data);
      } catch (err) {
        setError(err?.message);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  return (
    <View style={{ flex: 1, backgroundColor: white }}>
      <Header
        showBackButton={true}
        style={{
          paddingTop: safeAreaInsets.top,
          height: (Number(100 + safeAreaInsets.top))
        }}
      />
      { 
        loading
          ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: white }}>
              <ActivityIndicator size="large" color={lightGray} />
            </View>
          : <ProductDetail product={product} />
      }
    </View>
   );
}