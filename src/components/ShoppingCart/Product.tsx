import { Cartitem } from "../../types";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Trash2 } from "lucide-react-native";
import { lightGreen } from "../ui/colors";
import { formatMoney } from "../../utils";
import { useStore } from "../../store/";

import Quantity from "./Quantity";

export default function Product({ id, title, quantity, image, price, shippingPrice, stock }: Cartitem) {

  const { removeProduct } = useStore.shoppingCart();

  const totalPrice = price * quantity;
  const freeShipping = shippingPrice === 0;

  const handleRemoveProduct = () => {
    removeProduct(id);
  }

  return (
    <View style={styles.productContainer}>
      <View>
        <View style={styles.imageBackground}>
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.productInfoContainer}>
        <View style={{ gap: 5 }}>
          <View style={styles.productInfoRow}>
            <Text numberOfLines={2} style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={handleRemoveProduct}>
              <Trash2 size={25} strokeWidth={.8} />
            </TouchableOpacity>
          </View>
          <View style={styles.productInfoRow}>
            <Quantity quantity={quantity} id={id} stock={stock} />
          </View>
        </View>
        <View style={styles.productInfoRow}>
          <Text style={styles.shipping}>Frete</Text>
          <View>
            <View>
              <Text style={styles.totalPrice}>{formatMoney(totalPrice)}</Text>
            </View>
            <Text style={[styles.shippingPrice, { color: freeShipping ? lightGreen : '' }]}>
              {freeShipping ? 'Grátis' : formatMoney(shippingPrice)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: .3,
    borderBottomColor: '#ccc',
  },
  imageBackground: {
    width: 100,
    height: 100,
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: .5,
    borderColor: '#d7d7d7',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  productInfoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productInfoRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#515151'
  },
  shipping: {
    alignSelf: 'flex-end',
  },
  totalPrice: {
    fontSize: 16,
    textAlign: 'right'
  },
  shippingPrice: {
    marginTop: 3,
    fontSize: 12,
    textAlign: 'right'
  }
});