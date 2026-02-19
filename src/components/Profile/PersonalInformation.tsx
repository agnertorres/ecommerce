import { StyleSheet, Text, View } from 'react-native';
import { User, IdCard, MapPin } from 'lucide-react-native';

import { User as UserI } from '../../types';

import LinkButton from './LinkButton';

interface PersonalInformationProps {
    user: UserI | null;
}

export default function PersonalInformation({ user }: PersonalInformationProps) {
	return (
		<View>
			<Text style={styles.title}>Informações pessoais</Text>
			<LinkButton
				iconComponent={<IdCard size={30} strokeWidth={1} />}
				data={user?.name}
				description="Nome e sobrenome"
				onPress={() => () => {}}
			/>
			<LinkButton
				iconComponent={<IdCard size={30} strokeWidth={1} />}
				data={user?.cpf}
				description="Número do CPF"
				onPress={() => () => {}}
			/>
			<LinkButton
				iconComponent={<User size={30} strokeWidth={1} />}
				data={user?.nickname}
				description="Nome de preferência"
				onPress={() => () => {}}
			/>
			<LinkButton
				iconComponent={<MapPin size={30} strokeWidth={1} />}
				data={user?.address}
				description="Endereço cadastrado"
				onPress={() => () => {}}
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