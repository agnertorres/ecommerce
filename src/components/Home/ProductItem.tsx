import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

import { Product } from '../../types';

interface ProductItemProps {
  product: Product
}

export default function ProductItem ({ product }: ProductItemProps){
  return (
    <View style={styles.shadowWrapper}>
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
          <Text style={styles.price}>R$ {product.price}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowWrapper: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 5,
    // --- Sombra Android ---
    elevation: 4,
    // --- Sombra iOS ---
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 2,
  },
  cardInternal: {
    flex: 1,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  imageBackground: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#f7f7f7',
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
    color: '#333',
    height: 40,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});