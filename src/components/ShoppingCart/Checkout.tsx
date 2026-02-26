import { useSelector } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { darkGray, lightGreen, white } from '../ui/colors';
import Button from '../ui/Button';

import { selectCartTotalItems, selectCartSummary } from '../../store/slices/shoppingCartSlice';

import { formatMoney } from '../../utils';

export default function CheckOut() {
  const totalItems = useSelector(selectCartTotalItems);
  const { subtotal, shipping, total } = useSelector(selectCartSummary);

  const freeShipping = shipping === 0;

  return (
    <View style={styles.checkoutContainer}>
      <View style={[styles.checkoutSection]}>
        <Text style={styles.checkoutText}>{`Produtos (${totalItems}):`}</Text>
        <Text style={styles.checkoutText}>{formatMoney(subtotal)}</Text>
      </View>
      <View style={[styles.checkoutSection]}>
        <Text style={styles.checkoutText}>Frete</Text>
        <Text style={[styles.checkoutText, { color: freeShipping ? lightGreen : ''}]}>
          {freeShipping ? 'Grátis': formatMoney(shipping)}
        </Text>
      </View>
      <View style={[styles.checkoutSection]}>
        <Text style={styles.totalPrice}>Total</Text>
        <Text style={styles.totalPrice}>{formatMoney(total)}</Text>
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
    backgroundColor: white,
    marginTop: 10,
    shadowColor: darkGray,
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
