import { User as UserI, EditFieldProps } from '../../types';

import { User, IdCard, MapPin } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import LinkButton from './LinkButton';

interface PersonalInformationProps {
	user: UserI | null;
	editField: ({ field, value }: EditFieldProps) => void;
}

export default function PersonalInformation({ user, editField }: PersonalInformationProps) {
	return (
		<View>
			<Text style={styles.title}>Informações pessoais</Text>
			<LinkButton
				iconComponent={<IdCard size={30} strokeWidth={1} />}
				data={user?.name}
				description="Nome e sobrenome"
				onPress={() => {
          editField({ field: 'name', value: user?.name })
        }}
			/>
			<LinkButton
				iconComponent={<IdCard size={30} strokeWidth={1} />}
				data={user?.cpf}
				description="Número do CPF"
				onPress={() => {
          editField({ field: 'cpf', value: user?.cpf })
        }}
			/>
			<LinkButton
				iconComponent={<User size={30} strokeWidth={1} />}
				data={user?.nickname}
				description="Nome de preferência"
				onPress={() => {
          editField({ field: 'nickname', value: user?.nickname })
        }}
			/>
			<LinkButton
				iconComponent={<MapPin size={30} strokeWidth={1} />}
				data={user?.address}
				description="Endereço cadastrado"
				onPress={() => {
          editField({ field: 'address', value: user?.address })
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