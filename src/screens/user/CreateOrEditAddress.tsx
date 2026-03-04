import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardTypeOptions } from 'react-native';
import { Address } from '../../types';

import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

export default function CreateOrEditAddress() {
  const [data, setData] = useState<string | undefined>('');

  const loading = false;

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>{fieldNameMap[field]}</Text> */}
      <TextInput
        value={data}
        onChangeText={setData}
        style={styles.input}
        placeholder={'Cep'}
        autoCapitalize="none"
        keyboardType={'default'}
        maxLength={50}
      />
      <TextInput
        value={data}
        onChangeText={setData}
        style={styles.input}
        placeholder={'Cidade'}
        autoCapitalize="none"
        keyboardType={'default'}
        maxLength={50}
      />
      <TextInput
        value={data}
        onChangeText={setData}
        style={styles.input}
        placeholder={'Estado'}
        autoCapitalize="none"
        keyboardType={'default'}
        maxLength={50}
      />
      <TextInput
        value={data}
        onChangeText={setData}
        style={styles.input}
        placeholder={'Rua / Avenida'}
        autoCapitalize="none"
        keyboardType={'default'}
        maxLength={50}
      />
      <TextInput
        value={data}
        onChangeText={setData}
        style={styles.input}
        placeholder={'Número'}
        autoCapitalize="none"
        keyboardType={'default'}
        maxLength={50}
      />
      <TextInput
        value={data}
        onChangeText={setData}
        style={styles.input}
        placeholder={'Complemento (opcional)'}
        autoCapitalize="none"
        keyboardType={'default'}
        maxLength={50}
      />
      <TouchableOpacity
        style={loading ? [styles.button, styles.disabled] : styles.button}
        onPress={() => {}}
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