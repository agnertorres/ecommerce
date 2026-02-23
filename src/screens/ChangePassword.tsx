import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { changePassword } from '../services/user';

import { Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

import { styles } from '../screens/EditProfile';

export default function ChangePasswordScreen() {
	const [currentPassword, setcurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
	const [loading, setLoading] = useState(false);

	const navigation = useNavigation();

	const handleChangePassword = async () => {
		if (!currentPassword) {
			Alert.alert('Informe a senha atual');
			return;
		}

		if (!newPassword) {
			Alert.alert('Informe a nova senha');
			return;
		}

		if (!newPasswordConfirmation) {
			Alert.alert('Confirme a nova senha');
			return;
		}

		if (newPassword !== newPasswordConfirmation) {
			Alert.alert('Confirmação de senha incorreta');
			return;
		}

		setLoading(true);
		const response = await changePassword({ id: 10, currentPassword, newPassword });
		setLoading(false);

		Alert.alert('', 'Sua senha foi alterada com sucesso', [{
			text: 'Fechar',
			}],
			{
				cancelable: false,
			}
		);

		if (response.data === 'sucesso') {
			navigation.goBack();
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Alterar senha</Text>
			<TextInput
				value={currentPassword}
				onChangeText={setcurrentPassword}
				style={styles.input}
				placeholder={'Senha atual'}
				autoCapitalize="none"
				secureTextEntry={true}
				maxLength={50}
				autoFocus={true}
				editable={!loading}
			/>
			<TextInput
				value={newPassword}
				onChangeText={setNewPassword}
				style={styles.input}
				placeholder={'Nova senha'}
				autoCapitalize="none"
				secureTextEntry={true}
				maxLength={50}
				editable={!loading}
			/>
			<TextInput
				value={newPasswordConfirmation}
				onChangeText={setNewPasswordConfirmation}
				style={styles.input}
				placeholder={'Confirme a nova senha'}
				autoCapitalize="none"
				secureTextEntry={true}
				maxLength={50}
				editable={!loading}
			/>
			<TouchableOpacity
				style={loading ? [styles.button, styles.disabled] : styles.button}
				onPress={handleChangePassword}
				disabled={loading}
			>
				<SubmitButtonContent loading={loading} />
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.cancel}
				onPress={() => {
					navigation.goBack();
				}}
				disabled={loading}
			>
				<Text style={styles.cancelText}>Cancelar</Text>
			</TouchableOpacity>
		</View>
	)
}

function SubmitButtonContent({ loading }: { loading: boolean}) {
	if (loading) return <ActivityIndicator size="small" color="#fff" />

	return <Text style={styles.buttonText}>Alterar</Text>
}