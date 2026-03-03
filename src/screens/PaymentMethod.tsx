import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { CreditCard, ChevronRight } from 'lucide-react-native';
import { lightBlack, lightGray, lightGreen } from '../components/ui/colors';
import Card from '../components/ui/Card';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ShoppingCartStackParamList } from '../types/navigation';
import { useCartSummary } from '../store/useShoppingCartStore';
import { useStore } from '../store/';
import { formatMoney } from '../utils';

export default function PaymentMethodScreen() {
  const { total } = useCartSummary();

  const { setPaymentMethod } = useStore.shoppingCart();

  const navigation = useNavigation<NativeStackNavigationProp<ShoppingCartStackParamList>>();

  const handleSelectPaymentMethod = (paymentMethod: string) => {
    setPaymentMethod(paymentMethod);
    navigation.navigate('OrderConfirmation');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Selecione a forma de pagamento</Text>
      <TouchableOpacity onPress={() => handleSelectPaymentMethod('pix')} style={styles.paymentMethodContainer}>
        <Card style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 10, }}>
              <CreditCard size={25} strokeWidth={1} color={lightBlack} />
              <View>
                <Text style={{ fontSize: 16, color: lightBlack }}>Pix</Text>
                <Text style={{ color: lightGray, fontSize: 13, marginTop: 3 }}>
                  { `${formatMoney(total)}` }
                </Text>
              </View>
            </View>
            <ChevronRight size={25} strokeWidth={1} color={lightBlack} />
        </Card>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSelectPaymentMethod('creditCard')} style={styles.paymentMethodContainer}>
        <Card style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 10, }}>
              <CreditCard size={25} strokeWidth={1} color={lightBlack} />
              <View>
                <Text style={{ fontSize: 16, color: lightBlack }}>Cartão de crédito</Text>
                <Text style={{ color: lightGreen, fontSize: 13, marginTop: 3 }}>
                  { `10 x ${formatMoney((total / 10 ))} sem juros` }
                </Text>
              </View>
            </View>
            <ChevronRight size={25} strokeWidth={1} color={lightBlack} />
        </Card>
      </TouchableOpacity>
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
  paymentMethodContainer: {
    marginTop: 15,
    width: '100%',
  },
  title: {
    width: '100%',
    fontSize: 16,
    marginTop: 5,
  },
});