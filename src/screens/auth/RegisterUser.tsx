import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

import { createUser } from '../../services/user';

export default function RegisterUserScreen() {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateUser = () => {
    const userData = {
      name,
      nickname,
      email,
      cpf,
      phone,
      password
    };

    const data = createUser(userData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="Nome"
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
        textContentType="name"
      />
      <TextInput
        value={nickname}
        onChangeText={setNickname}
        style={styles.input}
        placeholder="Nome de exibição"
        autoCapitalize="none"
        keyboardType="default"
        textContentType="givenName"
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder="E-mail"
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
        textContentType="emailAddress"
      />
      <TextInput
        value={cpf}
        onChangeText={setCpf}
        style={styles.input}
        placeholder="CPF"
        autoCapitalize="none"
        keyboardType="number-pad"
        textContentType="none"
      />
      <TextInput
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        placeholder="Telefone"
        autoCapitalize="none"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
      />
      <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
      />
      <TouchableOpacity
        style={loading ? [styles.button, styles.disabled] : styles.button}
        onPress={handleCreateUser}
        disabled={loading}
      >
        <SubmitButtonContent loading={loading}/>
      </TouchableOpacity>
    </View>
  );
}

function SubmitButtonContent({ loading }: { loading: boolean}) {
  if (loading) return <ActivityIndicator size="small" color="#fff" />

  return <Text style={styles.buttonText}>Cadastrar</Text>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
    input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    maxWidth: 500
  },
    button: {
    width: '80%',
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
  error: {
    color: 'red',
    marginTop: 10,
  },
  disabled: {
    backgroundColor: '#ccc',
  },
});