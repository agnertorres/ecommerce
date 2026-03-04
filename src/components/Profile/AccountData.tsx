import { User } from '../../types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../types/navigation';
import { Phone, Mail, KeyRound, IdCard, MapPin, User as UserIcon } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { useDefaultAddress, useUserStore } from '../../store/useUserStore';

import LinkButton from './LinkButton';
import { lightBlack, lightGray, lightRed, yellow } from '../ui/colors';

export default function AccountData() {
  const defaultAddress = useDefaultAddress();
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();

  const { user } = useUserStore();

  return (
    <View>
      <Text style={styles.title}>Informações pessoais</Text>
      <LinkButton
        iconComponent={<IdCard size={30} strokeWidth={1} color={lightBlack} />}
        data={user?.name}
        description="Nome e sobrenome"
        onPress={() => {
          navigation.navigate('EditProfile', { field: 'name', value: user?.name });
        }}
      />
      <LinkButton
        iconComponent={<IdCard size={30} strokeWidth={1} color={lightBlack} />}
        data={user?.cpf}
        description="Número do CPF"
        onPress={() => {
          navigation.navigate('EditProfile', { field: 'cpf', value: user?.cpf });
        }}
      />
      <LinkButton
        iconComponent={<UserIcon size={30} strokeWidth={1} color={lightBlack} />}
        data={user?.nickname}
        description="Nome de preferência"
        onPress={() => {
          navigation.navigate('EditProfile', { field: 'nickname', value: user?.nickname });
        }}
      />
      <LinkButton
        iconComponent={<MapPin size={30} strokeWidth={1} color={defaultAddress ? lightBlack : yellow} />}
        data={
          defaultAddress
            ? `${defaultAddress?.street}, ${defaultAddress?.number}`
            : 'Cadastrar endereço'
        }
        description="Endereço de entrega"
        onPress={() => {
          navigation.navigate('AddressList');
        }}
      />
      <Text style={styles.title}>Dados da conta</Text>
      <LinkButton
        iconComponent={<Mail size={30} strokeWidth={1} color={lightBlack} />}
        data={user?.email}
        description="E-mail cadastrado"
        onPress={() => {
          navigation.navigate('EditProfile', { field: 'email', value: user?.email });
        }}
      />
      <LinkButton
        iconComponent={<Phone size={30} strokeWidth={1} color={lightBlack} />}
        data={user?.phone}
        description="Número de telefone"
        onPress={() => {
          navigation.navigate('EditProfile', { field: 'phone', value: user?.phone });
        }}
      />
      <LinkButton
        iconComponent={<KeyRound size={30} strokeWidth={1} color={lightBlack} />}
        data="********"
        description="Alterar senha"
        onPress={() => {
          navigation.navigate('ChangePassword');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
	title: {
		marginTop: 20,
		marginBottom: 10,
		fontSize: 20,
		fontWeight: '400',
		color: '#333',
	},
});