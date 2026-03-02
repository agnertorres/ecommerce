import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MapPin, ChevronRight } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../types/navigation';

export default function Address() {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();

  const { address } = useSelector((state: RootState) => state.user);

  const changeAddress = () => {
		navigation.navigate('EditProfile', { field: 'address', value: address });
	}

  return (
    <TouchableOpacity style={styles.addressContainer} onPress={changeAddress}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
        <MapPin color={'#fff'} size={21} strokeWidth={1.4} />
        <Text style={styles.addressText}>{address}</Text>
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