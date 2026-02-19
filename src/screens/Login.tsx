import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { signIn } from '../store/slices/authSlice';
import { setUserData } from '../store/slices/userSlice';

import { getToken, getUserData } from '../services/user';

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignin = async () => {
    if (!email || !password) {
      Alert.alert('Informe o e-mail e senha');
      return;
    }   
    setLoading(true);
    
    try {
      const token = await getToken();
      const userData = await getUserData(token);
      dispatch(setUserData(userData));
      dispatch(signIn({ token }));
      setLoading(false);
    } catch(e) {
      Alert.alert('Não foi possível concluir');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acesso</Text>
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
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
      />
      <TouchableOpacity
        style={loading ? [styles.button, styles.disabled] : styles.button}
        onPress={handleSignin}
        disabled={loading}
      >
        <SubmitButtonContent loading={loading}/>
      </TouchableOpacity>
    </View>
  );
}

function SubmitButtonContent({ loading }: { loading: boolean}) {
  if (loading) return <ActivityIndicator size="small" color="#fff" />

  return <Text style={styles.buttonText}>Entrar</Text>
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