import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { MapPin, CreditCard, ReceiptText } from 'lucide-react-native';
import { lightBlack, lightGray, lightGreen, separator } from '../../components/ui/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ShoppingCartStackParamList } from '../../types/navigation';

import { useCartSummary } from '../../store/useShoppingCartStore';
import { useStore } from '../../store';
import { formatMoney } from '../../utils';
import { Button, Card } from '../../components/ui/components';

const paymentMethodMap = {
  'pix': 'Pix',
  'creditCard': 'Cartão de crédito',
  'boleto': 'Boleto'
};

export default function OrderConfirmationScreen() {
  const { user } = useStore.user();
  const { subtotal, shipping, total, paymentMethod, totalItems } = useCartSummary();

  const address = 'endereco mockado';

  const freeShipping = shipping === 0;

  const navigation = useNavigation<NativeStackNavigationProp<ShoppingCartStackParamList>>();

  const confirmOrder = () => {
    navigation.navigate('CheckoutSuccess');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Confira os dados e confirme seu pedido.</Text>
      <Card style={styles.paymentContainer}>
        <View style={styles.line}>
          <Text style={{ color: lightBlack }}>{`Produtos (${totalItems})`}</Text>
          <Text style={{ color: lightBlack }}>{formatMoney(subtotal)}</Text>
        </View>
        <View style={styles.line}>
          <Text style={{ color: lightBlack }}>Frete</Text>
          <Text style={{ color: freeShipping ? lightGreen : lightBlack }}>
            {freeShipping ? 'Grátis' : formatMoney(shipping)}
          </Text>
        </View>
        <View style={[styles.line, { borderTopColor: separator, borderTopWidth: .8, paddingTop: 10, } ]}>
          <Text style={styles.totalPriceText}>Total</Text>
          <Text style={styles.totalPriceText}>{formatMoney(total)}</Text>
        </View>
        <Button onPress={confirmOrder} style={{ marginTop: 10 }}>
          Confirmar compra
        </Button>
      </Card>

      <Text style={styles.subtitle}>Faturamento</Text>
      <Card style={styles.cardDetail}>
        <ReceiptText size={25} strokeWidth={1} color={lightBlack} />
        <View style={{ gap: 5 }}>
          <Text style={{ color: lightBlack }}>{user?.name}</Text>
          <Text style={{ color: lightGray }}>{user?.cpf}</Text>
        </View>
      </Card>

      <Text style={styles.subtitle}>Detalhes da entrega</Text>
      <Card style={styles.cardDetail}>
        <MapPin size={25} strokeWidth={1} color={lightBlack} />
        <View style={{ gap: 5 }}>
          <Text style={{ color: lightBlack }}>{address}</Text>
          <Text style={{ color: lightGray }}>Endereço de entrega</Text>
        </View>
      </Card>

      <Text style={styles.subtitle}>Detalhes do pagamento</Text>
      <Card style={[styles.cardDetail, { justifyContent: 'space-between' } ]}>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <CreditCard size={25} strokeWidth={1} color={lightBlack} />
          <View style={{ gap: 5 }}>  
            <Text>{paymentMethodMap[paymentMethod]}</Text>
            {
              paymentMethod === 'creditCard'
                ? <Text style={{ color: lightGreen, fontSize: 13 }}>{`10x de ${formatMoney(total)} sem juros`}</Text>
                : <Text style={{ color: lightGray, fontSize: 13 }}>{'a vista'}</Text>
            }
          </View>
        </View>
        <Text style={{ color: lightBlack }}>{formatMoney(total)}</Text>
      </Card>
    </ScrollView>
   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  paymentContainer: {
    marginTop: 15,
    width: '100%',
    gap: 15,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPriceText: {
    fontWeight: 500,
    fontSize: 18,
  },
  cardDetail: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    width: '100%',
    fontSize: 16,
    marginTop: 5,
  },
  subtitle: {
    width: '100%',
    fontSize: 14,
    marginTop: 35,
    marginBottom: 10,
  }
});