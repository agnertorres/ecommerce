import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../../store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../types/navigation';
import { Error } from '../../components/ui/components';

import { Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

import { styles } from './EditProfile';
type ChangePasswordProps = NativeStackScreenProps<ProfileStackParamList, 'CreateOrEditAddress'>;


export default function ChangePasswordScreen() {
	const { user, loading, changePassword, error, clearError } = useStore.user();
	const { signOut } = useStore.auth();

	const navigation = useNavigation<NativeStackNavigationProp<ChangePasswordProps>>();

	const [formData, setFormData] = useState({
		currentPassword: '',
		newPassword: '',
		newPasswordConfirmation: '',
	});

	const init = useCallback(() => {
		return clearError();
	}, [error]);

	useFocusEffect(init);

	const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

	const validateFields = () => {
		if (!formData.currentPassword) {
			Alert.alert('Informe a senha atual');
			return false;
		}

		if (!formData.newPassword) {
			Alert.alert('Informe a nova senha');
			return false;
		}

		if (!formData.newPasswordConfirmation) {
			Alert.alert('Confirme a nova senha');
			return false;
		}

		if (formData.newPassword !== formData.newPasswordConfirmation) {
			Alert.alert('Confirmação de senha incorreta');
			return false;
		}

		return true;
	}

	const handleChangePassword = async () => {
		const isValidFields = validateFields();

		if(!isValidFields) {
			return;
		}

		await changePassword(user.id, formData);
		signOut();
	}

	return (
		<View style={styles.container}>
			{error ? <Error message={error} onClose={clearError} /> : ''}
			<Text style={styles.title}>Alterar senha</Text>
			<TextInput
				value={formData.currentPassword}
				onChangeText={(text) => handleChange('currentPassword', text)}
				style={styles.input}
				placeholder={'Senha atual'}
				autoCapitalize="none"
				secureTextEntry={true}
				maxLength={50}
				autoFocus={true}
				editable={!loading}
			/>
			<TextInput
				value={formData.newPassword}
				onChangeText={(text) => handleChange('newPassword', text)}
				style={styles.input}
				placeholder={'Nova senha'}
				autoCapitalize="none"
				secureTextEntry={true}
				maxLength={50}
				editable={!loading}
			/>
			<TextInput
				value={formData.newPasswordConfirmation}
				onChangeText={(text) => handleChange('newPasswordConfirmation', text)}
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

function SubmitButtonContent({ loading }: { loading: boolean }) {
	if (loading) return <ActivityIndicator size="small" color="#fff" />

	return <Text style={styles.buttonText}>Alterar</Text>
}