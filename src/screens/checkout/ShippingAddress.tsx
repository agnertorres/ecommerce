import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { MapPin, ChevronRight } from 'lucide-react-native';
import { lightBlack, lightGray, lightGreen } from '../../components/ui/colors';
import { Card } from '../../components/ui/components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ShoppingCartStackParamList } from '../../types/navigation';

import { useCartSummary } from '../../store/useShoppingCartStore';
import { formatMoney } from '../../utils';

export default function ShippingAddressScreen() {
  const { shipping } = useCartSummary();

  const address = 'endereco mockado';

  const freeShipping = shipping === 0;

  const navigation = useNavigation<NativeStackNavigationProp<ShoppingCartStackParamList>>();

  const selectAddress = () => {
    navigation.navigate('PaymentMethod');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Selecione o endereço de entrega</Text>
      <TouchableOpacity onPress={selectAddress} style={styles.addressContainer}>
        <Card style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 10, }}>
              <MapPin size={25} strokeWidth={1} color={lightBlack} />
              <View>
                <Text style={{ fontSize: 16, color: lightBlack }}>{address}</Text>
                <Text style={{ color: (freeShipping ? lightGreen : lightGray), fontSize: 13, marginTop: 3 }}>
                  { freeShipping ? 'Grátis' : formatMoney(shipping) }
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
  addressContainer: {
    marginTop: 15,
    width: '100%',
  },
  title: {
    width: '100%',
    fontSize: 16,
    marginTop: 5,
  },
});