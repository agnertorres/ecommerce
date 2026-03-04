import { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useUserAddresses } from '../../store/useUserStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Address } from '../../types';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { ChevronRight, CheckCircle2} from 'lucide-react-native';
import { lightGray, lightGreen } from '../../components/ui/colors';
import { Button, Card } from '../../components/ui/components';

type AddressListStack = { CreateOrEditAddress: undefined };

export default function AddressListScreen() {
  const addresses = useUserAddresses();

  const navigation = useNavigation<NativeStackNavigationProp<AddressListStack>>();

  const selectAddress = () => {
    navigation.navigate('CreateOrEditAddress');
  }

  const sortedAddresses = useMemo(() => {
    const defaultAddr = addresses.filter(a => a.isDefault);
    const others = addresses.filter(a => !a.isDefault);
    
    return [...defaultAddr, ...others];
  }, [addresses]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione um endereço para alterar</Text>
      <FlatList
        data={sortedAddresses}
        renderItem={({ item }) => <AddressCard address={item} onPress={selectAddress} />}
        keyExtractor={item => item.id.toString()}
        numColumns={1}
        contentContainerStyle={{ flexGrow: 0, }}
        style={{ width: '100%', flexGrow: 0  }}
      />
      <Button style={{ marginTop: 20 }} onPress={selectAddress}>
        Adicionar novo endereço
      </Button>
    </View>
   );
}

interface AddressComponentProps {
  address: Address;
  onPress: () => void;
}

const AddressCard = ({ address, onPress}: AddressComponentProps) => (
  <TouchableOpacity onPress={onPress} style={styles.addressContainer}>
    <Card style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
      <View style={styles.textContainer}>
        <Text style={{ fontSize: 16, fontWeight: 500 }}>{`${address?.street}, ${address?.number} ${address?.complement}`}</Text>
        <Text style={{ fontSize: 14 }}>{`CEP ${address?.zipcode} - ${address?.state} - ${address?.city}`}</Text>
        {
          address?.isDefault && (
            <View style={{ marginTop: 8, flexDirection: 'row', alignContent: 'center', gap: 5 }}>
              <CheckCircle2 size={19} strokeWidth={1.5} color={lightGreen} />
              <Text style={{ color: lightGreen, marginTop: 2, fontSize: 12 }}>Endereço de entrega</Text>
            </View>
          )
        }
      </View>
      <ChevronRight size={25} strokeWidth={1} color={lightGray} />
    </Card>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  title: {
    width: '100%',
    fontSize: 16,
    marginTop: 5,
  },
  addressContainer: {
    width: '100%',
    marginTop: 20,
  },
  textContainer: {
    gap: 5,
  }
});