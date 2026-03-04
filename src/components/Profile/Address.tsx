import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MapPin, ChevronRight } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../types/navigation';
import { useDefaultAddress } from "../../store/useUserStore";

export default function Address() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
	const address = useDefaultAddress();

  const changeAddress = () => {
		navigation.navigate('AddressList');
	}

  return (
    <TouchableOpacity style={styles.addressContainer} onPress={changeAddress}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        <MapPin color={'#fff'} size={21} strokeWidth={1.4} />
        <Text style={styles.addressText}>
					{address ? `${address?.street}, ${address?.number}` : 'Cadastrar endereço de entrega'}
				</Text>
      </View>
      <ChevronRight style={styles.chevronRight} color={'#fff'} size={21} strokeWidth={1.4} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addressContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 15,
    paddingTop: 3,
	},
	addressText: {
		color: '#fff',
		fontSize: 15,
	},
	chevronRight: {
		alignSelf: 'flex-end',
	},
})