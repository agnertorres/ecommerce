import { useSelector } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../ui/Button';

import {
  selectCartTotalItems,
  selectCartTotalPrice,
  selectCartSubtotal,
  selectTotalShipping,
} from '../../store/slices/shoppingCartSlice';

import { formatMoney } from '../../utils';

export default function CheckOut() {
  const totalItems = useSelector(selectCartTotalItems);
  const totalprice = useSelector(selectCartTotalPrice);
  const subTotal = useSelector(selectCartSubtotal);
  const totalShippingPrice = useSelector(selectTotalShipping);

  const freeShipping = totalShippingPrice === 0;

  return (
    <View style={styles.checkoutContainer}>
      <View style={[styles.checkoutSection]}>
        <Text style={styles.checkoutText}>{`Produtos (${totalItems}):`}</Text>
        <Text style={styles.checkoutText}>{formatMoney(subTotal)}</Text>
      </View>
      <View style={[styles.checkoutSection]}>
        <Text style={styles.checkoutText}>Frete</Text>
        <Text style={[styles.checkoutText, { color: freeShipping ? '#00a71f' : ''}]}>
          {freeShipping ? 'Grátis': formatMoney(totalShippingPrice)}
        </Text>
      </View>
      <View style={[styles.checkoutSection]}>
        <Text style={styles.totalPrice}>Total</Text>
        <Text style={styles.totalPrice}>{formatMoney(totalprice)}</Text>
      </View>
      <Button>
        Continuar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  checkoutContainer: {
    justifyContent: 'center',
    padding: 10,
    width: '100%',
    gap: 10,
    backgroundColor: '#fff',
    marginTop: 10,
    shadowColor: '#2e2e2e',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3,
		elevation: 5,
  },
  checkoutSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkoutText: {
    fontSize: 12,
    color: '#515151',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '500',
  }
});
