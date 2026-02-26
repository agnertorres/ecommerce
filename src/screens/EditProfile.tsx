import React, { useState, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../types/navigation';
import { useNavigation } from '@react-navigation/native';

import { KeyboardTypeOptions } from 'react-native';

import { editField } from '../services/user';
import { User } from '../types';

import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

type EditProfileProps = NativeStackScreenProps<ProfileStackParamList, 'EditProfile'>;

const fieldNameMap: User = {
  name: 'Nome e sobrenome',
	cpf: 'CPF',
	nickname: 'Nome de preferência',
	address: 'Endereço',
	email: 'E-mail',
	phone: 'Número de telefone',
	password: 'Senha',
};

const keyboardType: User = {
  name: 'default',
	cpf: 'number-pad',
	nickname: 'default',
	address: 'default',
	email: 'email-address',
	phone: 'phone-pad',
	password: 'default',
};

export default function EditProfileScreen({ route }: EditProfileProps) {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const { field, value } = route.params;

  const navigation = useNavigation();

  const handleEditField = async () => {
    if (!data) {
      Alert.alert(`Informe um ${fieldNameMap[field].toLowerCase()}`);
      return;
    }

    if(value === data) {
      Alert.alert(`Informe um ${fieldNameMap[field].toLowerCase()} diferente do anterior`);
      return;
    }

    setLoading(true);
    const response = await editField({ id: 10, field, value: data });
    setLoading(false);

    if (response.data === 'sucesso') {
      navigation.goBack();
    }
  }

  useEffect(() => {
    setData(value);
  }, [value]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{fieldNameMap[field]}</Text>
      <TextInput
        value={data}
        onChangeText={setData}
        style={styles.input}
        placeholder={fieldNameMap[field]}
        autoCapitalize="none"
        keyboardType={keyboardType[field] as KeyboardTypeOptions}
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