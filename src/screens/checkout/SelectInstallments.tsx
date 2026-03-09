import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { CreditCard, ChevronRight } from 'lucide-react-native';
import { gray, lightBlack, lightGray, lightGreen } from '../../components/ui/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ShoppingCartStackParamList } from '../../types/navigation';
import { useCartSummary, useShoppingCartStore } from '../../store/useShoppingCartStore';
import { formatMoney } from '../../utils';

const installments = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function SelectInstallmentsScreen() {
  const { setInstallments } = useShoppingCartStore();
  const navigation = useNavigation<NativeStackNavigationProp<ShoppingCartStackParamList>>();

  const selectInstallments = (installments: number) => {
    setInstallments(installments);
    navigation.navigate('OrderConfirmation');
  }

  return (
    <View style={styles.container}>
       <FlatList
          data={installments}
          ListHeaderComponent={ListHeaderComponent}
          renderItem={({ item }) => <InstallmentsCard installments={item} onPress={() => { selectInstallments(item) }} />}
          keyExtractor={item => item.toString()}
          numColumns={1}
          contentContainerStyle={{ flexGrow: 0 }}
          style={styles.list}
        />
    </View>
   );
}

interface InstallmentsCard {
  onPress: () => void,
  installments: number,
}

const ListHeaderComponent = () => {
  const { paymentMethod } = useCartSummary();
  return (
    <View>
      <Text style={styles.title}>Selecione o número de parcelas</Text>
      <View style={styles.paymentMethod}>
         <CreditCard size={25} strokeWidth={1} color={lightBlack} />
        <Text style={{ color: lightBlack }}>{`${paymentMethod.brand} - Final ${paymentMethod.lastFourDigits}`}</Text>
      </View>
    </View>
  )
}

const InstallmentsCard = ({ onPress, installments }: InstallmentsCard) => {
  const { total } = useCartSummary();

  return (
    <TouchableOpacity onPress={onPress} style={styles.installmentsContainer}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 5, }}>
          <Text style={{ color: lightBlack, fontSize: 16 }}>
            {`${installments}x ${formatMoney(total / installments)}`}
          </Text>
          <Text style={{ color: lightGreen, fontSize: 12 }}>
            sem juros
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 10, }}>
          <Text style={{ fontSize: 14, color: lightGray, marginTop: 3 }}>{`${formatMoney(total)}`}</Text>
          <ChevronRight size={25} strokeWidth={1} color={lightBlack} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  list: {
    flexGrow: 0,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: gray
  },
  installmentsContainer: {
    borderTopWidth: 1,
    borderTopColor: gray,
    borderLeftWidth: 1,
    borderLeftColor: gray,
    borderRightWidth: 1,
    borderRightColor: gray,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    marginTop: 5,
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    backgroundColor: gray,
    borderRadius: 2,
    marginTop: 10,
    gap: 10,
  }
});