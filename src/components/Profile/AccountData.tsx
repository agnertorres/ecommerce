import { User } from '../../types';

import { Phone, Mail, KeyRound } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import LinkButton from './LinkButton';

interface AccountDataProps {
  user: User | null;
  editField: () => void;
}

export default function AccountData({ user, editField }: AccountDataProps) {
  return (
    <View>
      <Text style={styles.title}>Dados da conta</Text>
      <LinkButton
        iconComponent={<Mail size={30} strokeWidth={1} />}
        data={user?.email}
        description="E-mail cadastrado"
        onPress={() => {
          editField({ field: 'email', value: user?.email })
        }}
      />
      <LinkButton
        iconComponent={<Phone size={30} strokeWidth={1} />}
        data={user?.phone}
        description="Número de telefone"
        onPress={() => {
          editField({ field: 'phone', value: user?.phone })
        }}
      />
      <LinkButton
        iconComponent={<KeyRound size={30} strokeWidth={1} />}
        data="********"
        description="Alterar senha"
        onPress={() => {
          editField({ field: 'password' })
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