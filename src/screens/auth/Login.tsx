import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { AuthStackParamList } from '../../types/navigation';
import Error from '../../components/ui/components/Error';
import { Button } from '../../components/ui/components';

import { useStore } from '../../store';
import { blue } from '../../components/ui/colors';

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const { signIn, loading, error, clearError } = useStore.auth(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = () => {
    navigation.navigate('RegisterUser');
  }

  const handleSignin = async () => {
    if (!email || !password) {
      Alert.alert('Informe o e-mail e senha');
      return;
    }
    signIn(email, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acesso</Text>
      { error && <Error message={error} onClose={clearError} />}
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
      
      <Button onPress={handleSignin} loading={loading} style={{ marginTop: 15 }}>
        Entrar
      </Button>
      <Button onPress={registerUser} style={{ marginTop: 15 }}>
        Cadastrar
      </Button>
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
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
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
    backgroundColor: blue,
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