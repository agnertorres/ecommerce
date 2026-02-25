import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Product } from '../types';
import { formatMoney } from '../utils';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

import { getProductById } from '../services/product';
import Button from '../components/ui/Button';
import Header from '../components/Home/Header';

export default function ProductDetailScreen({ route }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

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
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header
        showBackButton={true}
        style={{
          paddingTop: safeAreaInsets.top,
          height: (Number(100 + safeAreaInsets.top))
        }}
      />
      { 
        loading
          ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
              <ActivityIndicator size="large" color="#7b7b7b" />
            </View>
          : <ProductDetail
              product={product}
              selectedQuantity={selectedQuantity}
              setSelectedQuantity={setSelectedQuantity}
            />
      }
    </View>
   );
}

interface ProductDetailProps {
  product: Product | null,
  selectedQuantity: number,
  setSelectedQuantity: React.Dispatch<React.SetStateAction<number>>
}

const ProductDetail = ({ product, selectedQuantity, setSelectedQuantity }: ProductDetailProps) => (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>{product?.title}</Text>
    <View style={styles.imageBackground}>
      <Image
        source={{ uri: product?.image }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>

    <View style={styles.priceContainer}>
      <Text style={styles.price}>
        {formatMoney(product?.price)}
      </Text>
      <Text style={styles.paymentInInstallments}>
        10x {formatMoney((product?.price / 10))} sem juros
      </Text>
    </View>

    <View style={styles.shippingContainer}>
      {
        product?.shippingPrice === 0
          ? <Text style={{ color: '#00a71f' }}>Frete grátis</Text>
          : <Text style={{ color: '#3f3f3f'}}>
              Entrega: <Text style={{ fontWeight: 'bold' }}>{formatMoney(product?.shippingPrice)}</Text>
            </Text>
      }
    </View>

    <Text style={styles.stock}>Estoque disponível</Text>
    <TouchableWithoutFeedback>
      <View style={styles.quantityContainer}>
        <Text>
          Quantidade: <Text style={{ fontWeight: 'bold' }}>{selectedQuantity}</Text>
        </Text>
        <Text style={styles.quantity}>
          {`(${product?.quantity} Disponível)`}
        </Text>
      </View>
    </TouchableWithoutFeedback>

    <View style={{display: 'flex', flexDirection:'column',  gap: 10, width: '100%', marginVertical: 15 }}>
      <Button>
        Comprar agora
      </Button>
      <Button backgroundColor={'#d3e8ff'} textColor={'#007BFF'}>
        Adicionar ao carrinho
      </Button>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    width: '100%',
  },
  imageBackground: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  priceContainer: {
    marginBottom: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 3,
  },
  price: {
    fontSize: 28,
  },
  paymentInInstallments: {
    fontSize: 16,
    color: '#00a71f',
  },
  shippingContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 15,
  },
  stock: {
    width: '100%',
    fontSize: 15,
  },
  quantityContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,
		backgroundColor: '#f1f1f1',
		borderRadius: 5,
    marginVertical: 10,
    gap: 5,
  },
  quantity: {
    color: '#8d8d8d'
  },
});