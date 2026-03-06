import { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useUserAddresses } from '../../store/useUserStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PaymentMethod } from '../../types';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { CreditCard, Trash2} from 'lucide-react-native';
import { lightGray, lightGreen, lightBlack, lightRed, darkGray } from '../../components/ui/colors';
import { Button, Card } from '../../components/ui/components';
import { useStore } from '../../store';


export default function CreditCardListScreen() {
  const { paymentMethods, removePaymentMethod } = useStore.payment();
  const { user } = useStore.user();

  const navigation = useNavigation();

  const removeCreditCard = (paymentId: string) => {
    removePaymentMethod(user.id, paymentId)
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gerencie seus cartões de crédito</Text>
      <FlatList
        data={paymentMethods}
        renderItem={({ item }) => <CreditCardComponent paymentMethod={item} onPress={() => { removeCreditCard(item.id) }} />}
        keyExtractor={item => item.id.toString()}
        numColumns={1}
        contentContainerStyle={{ flexGrow: 0 }}
        style={{ flexGrow: 0, paddingBottom: 5 }}
        scrollEnabled={false}
        nestedScrollEnabled={true}
      />
      <Button
        style={{ marginTop: 20 }}
        onPress={() => {
          navigation.navigate('CreateCreditCard');
        }}>
        + Adicionar novo cartão
      </Button>
    </ScrollView>
   );
}

interface creditCardComponentProps {
  paymentMethod: PaymentMethod;
  onPress: () => void;
}

const CreditCardComponent = ({ paymentMethod, onPress}: creditCardComponentProps) => (
  <Card style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <CreditCard size={30} strokeWidth={1} color={lightBlack} />
      <View>
        <Text style={{ color: lightBlack, fontSize: 16 }}>{`**** **** **** ${paymentMethod.lastFourDigits}`}</Text>
        <Text style={{ color: lightGray, fontSize: 14 }}>{paymentMethod.brand}</Text>
      </View>
    </View>
    <TouchableOpacity onPress={onPress} style={styles.removeCreditCard}>
      <Trash2 size={25} strokeWidth={1} color={lightRed}/>
    </TouchableOpacity>
  </Card>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 10,
  },
  title: {
    width: '100%',
    fontSize: 16,
    marginTop: 5,
  },
  textContainer: {
    flex: 1,
    gap: 5,
  },
  removeCreditCard: {
    shadowColor: darkGray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  }
});