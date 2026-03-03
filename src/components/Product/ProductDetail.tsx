import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Product } from '../../types';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { blue, lightBlue, lightGreen, white, darkGray, gray, lightGray } from '../ui/colors';
import Button from '../ui/Button';
import SelectQuantityModal from './SelectQuantityModal';
import { formatMoney } from '../../utils';

import { useStore } from '../../store';

export default function ProductDetail({ product }: { product: Product}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const { addProduct } = useStore.shoppingCart();

  const buyNow = () => {
    addProduct(product, selectedQuantity);
    navigation.navigate('ShoppingCartStack', { screen: 'ShoppingCart' });
  }

  const addToCart = () => {
    addProduct(product, selectedQuantity);
    Alert.alert('Produto adicionado', 'Seu produto foi adicionado ao carrinho.',
      [
        { text: 'Ir para o carrinho', onPress: () => navigation.navigate('ShoppingCartStack', { screen: 'ShoppingCart' }) },
        { text: 'Continuar comprando', onPress: () => navigation.goBack() }
      ],
      {
        cancelable: false,
      }
    );
  }

  return (
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
            ? <Text style={{ color: lightGreen }}>Frete grátis</Text>
            : <Text style={{ color: darkGray}}>
                Entrega: <Text style={{ fontWeight: 'bold' }}>{formatMoney(product?.shippingPrice)}</Text>
              </Text>
        }
      </View>

      <Text style={styles.stock}>Estoque disponível</Text>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.quantityContainer}>
          <Text>
            Quantidade: <Text style={{ fontWeight: 'bold' }}>{selectedQuantity}</Text>
          </Text>
          <Text style={{ color: lightGray }}>
            {`(${product?.stock} Disponível)`}
          </Text>
        </View>
      </TouchableWithoutFeedback>

      <View style={{display: 'flex', flexDirection:'column',  gap: 10, width: '100%', marginVertical: 15 }}>
        <Button onPress={buyNow}>
          Comprar agora
        </Button>
        <Button onPress={addToCart} backgroundColor={lightBlue} textColor={blue}>
          {`Adicionar ao carrinho (${selectedQuantity})`}
        </Button>
      </View>
      <SelectQuantityModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedQuantity={selectedQuantity}
        setSelectedQuantity={setSelectedQuantity}
        stock={product?.stock}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: white,
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
    color: lightGreen,
  },
  shippingContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 10,
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
		backgroundColor: gray,
		borderRadius: 5,
    marginTop: 5,
    gap: 5,
  },
  quantity: {
    color: lightGray,
  },
});