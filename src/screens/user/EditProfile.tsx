import React, { useState, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../types/navigation';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../../store';

import { KeyboardTypeOptions } from 'react-native';

import { UserFormData } from '../../types';

import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

type EditProfileProps = NativeStackScreenProps<ProfileStackParamList, 'EditProfile'>;

const fieldNameMap: UserFormData = {
  name: 'Nome e sobrenome',
	cpf: 'CPF',
	nickname: 'Nome de preferência',
	email: 'E-mail',
	phone: 'Número de telefone',
};

const keyboardType: UserFormData = {
  name: 'default',
	cpf: 'number-pad',
	nickname: 'default',
	email: 'email-address',
	phone: 'phone-pad',
};

export default function EditProfileScreen({ route }: EditProfileProps) {
  const [newValue, setNewValue] = useState<string | undefined>('');
  const { field, value } = route.params;

  const { user, loading, updateProfileData } = useStore.user();

  const navigation = useNavigation();

  const handleEditField = async () => {
    if (!newValue) {
      Alert.alert(`Informe um ${fieldNameMap[field as keyof UserFormData].toLowerCase()}`);
      return;
    }

    if (value === newValue) {
      Alert.alert(`Informe um ${fieldNameMap[field as keyof UserFormData].toLowerCase()} diferente do anterior`);
      return;
    }

    const userFormData: Partial<UserFormData> = { [field]: newValue };
    updateProfileData(user.id, userFormData as UserFormData);
    navigation.goBack();
  }

  useEffect(() => {
    setNewValue(value);
  }, [value]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{fieldNameMap[field as keyof UserFormData]}</Text>
      <TextInput
        value={newValue}
        onChangeText={setNewValue}
        style={styles.input}
        placeholder={fieldNameMap[field as keyof UserFormData]}
        autoCapitalize="none"
        keyboardType={keyboardType[field as keyof UserFormData] as KeyboardTypeOptions}
        maxLength={50}
        autoFocus={true}
        editable={!loading}
      />
      <TouchableOpacity
        style={loading ? [styles.button, styles.disabled] : styles.button}
        onPress={handleEditField}
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
  );
}

function SubmitButtonContent({ loading }: { loading: boolean}) {
  if (loading) return <ActivityIndicator size="small" color="#fff" />

  return <Text style={styles.buttonText}>Alterar</Text>
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  title: {
    fontSize: 16,
    textAlign: 'left',
    width: '100%',
    maxWidth: 500,
    fontWeight: '400',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    maxWidth: 500
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    maxWidth: 500
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  cancel: {
    width: '100%',
    height: 40,
    backgroundColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 7,
    maxWidth: 500
  },
  cancelText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});