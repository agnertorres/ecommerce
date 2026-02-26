import { Product } from '../../types';
import { useNavigation } from '@react-navigation/native';
import { formatMoney } from '../../utils';
import { black, lightGreen, white, darkGray, gray, lightBlack } from '../../components/ui/colors';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

interface ProductItemProps {
  product: Product
}

export default function ProductItem ({ product }: ProductItemProps) {
  const navigation = useNavigation();

	const selectProduct = () => {
		navigation.navigate('ProductDetail', { id: product.id });
	}

  return (
    <TouchableOpacity style={styles.shadowWrapper} onPress={selectProduct}>
      <View style={styles.cardInternal}>
        <View style={styles.imageBackground}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.info}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>
            {formatMoney(product.price)}
          </Text>
          <Text style={styles.paymentInInstallments}>
            10x {formatMoney((product.price / 10))} sem juros
          </Text>
          {
            product?.shippingPrice === 0
              ? <Text style={styles.shippingPrice}>Frete grátis</Text>
              : ''
          }
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadowWrapper: {
    width: '48%',
    backgroundColor: white,
    borderRadius: 5,
    // --- Sombra Android ---
    elevation: 4,
    // --- Sombra iOS ---
    shadowColor: black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 2,
  },
  cardInternal: {
    flex: 1,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: white,
  },
  imageBackground: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  info: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    color: darkGray,
    height: 40,
  },
  price: {
    fontSize: 20,
    color: lightBlack,
  },
  paymentInInstallments: {
    fontSize: 13,
    color: lightGreen,
  },
  shippingPrice: {
    marginTop: 15,
    color: lightGreen,
  }
});