import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { CreditCard, ChevronRight } from 'lucide-react-native';
import { lightBlack, lightGray, lightGreen } from '../../components/ui/colors';
import { Card } from '../../components/ui/components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ShoppingCartStackParamList } from '../../types/navigation';
import { useCartSummary } from '../../store/useShoppingCartStore';
import { useStore } from '../../store';
import { formatMoney } from '../../utils';
import { PaymentMethod } from '../../types';

export default function PaymentMethodScreen() {
  const { total } = useCartSummary();
  const { paymentMethods } = useStore.payment();

  const { setPaymentMethod } = useStore.shoppingCart();

  const navigation = useNavigation<NativeStackNavigationProp<ShoppingCartStackParamList>>();

  const handleSelectPaymentMethod = (paymentMethod: PaymentMethod) => {
    setPaymentMethod(paymentMethod);

    paymentMethod.brand === 'pix'
      ? navigation.navigate('OrderConfirmation')
      : navigation.navigate('SelectInstallments')
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Selecione a forma de pagamento</Text>
      <TouchableOpacity style={styles.paymentMethodContainer} onPress={() => {handleSelectPaymentMethod({ brand: 'pix' })}}>
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
       <FlatList
          data={paymentMethods}
          renderItem={
            ({ item }) => <PaymentMethodComponent paymentMethod={item} onPress={() => { handleSelectPaymentMethod(item)}} />
          }
          keyExtractor={item => item.id.toString()}
          numColumns={1}
          contentContainerStyle={{ flexGrow: 0 }}
          style={{ flexGrow: 0, paddingBottom: 5 }}
          scrollEnabled={false}
          nestedScrollEnabled={true}
        />
    </ScrollView>
   );
}

interface PaymentMethodComponentProps {
  paymentMethod: PaymentMethod;
  onPress: () => void;
}

const PaymentMethodComponent = ({ paymentMethod, onPress }: PaymentMethodComponentProps) => {
  const { total } = useCartSummary();

  return (
    <TouchableOpacity onPress={onPress} style={styles.paymentMethodContainer}>
      <Card style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 10, }}>
            <CreditCard size={25} strokeWidth={1} color={lightBlack} />
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: 16, color: lightBlack }}>
                {`${paymentMethod.brand} - final ${paymentMethod.lastFourDigits}`}
              </Text>
              <Text style={{ color: lightGreen, fontSize: 13,  marginTop: 3 }}>
                {`até 10x ${formatMoney(total / 10)} sem juros`}
              </Text>
            </View>
          </View>
          <ChevronRight size={25} strokeWidth={1} color={lightBlack} />
      </Card>
    </TouchableOpacity>
  )
};

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