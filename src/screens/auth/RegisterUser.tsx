import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useStore } from '../../store';
import { Error, Button, TextInput } from '../../components/ui/components';
 
export default function RegisterUserScreen() {
  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    email: '',
    cpf: '',
    phone: '',
    password: '',
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const { createUser, loading, error, clearError } = useStore.user();

  const handleCreateUser = () => {
    createUser(formData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      {error ? <Error message={error} onClose={clearError} /> : ''}
      <TextInput
        value={formData.name}
        onChangeText={(text) => handleChange('name', text)}
        placeholder="Nome"
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
        textContentType="name"
      />
      <TextInput
        value={formData.nickname}
        onChangeText={(text) => handleChange('nickname', text)}
        placeholder="Nome de exibição"
        autoCapitalize="none"
        keyboardType="default"
        textContentType="givenName"
      />
      <TextInput
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
        placeholder="E-mail"
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
        textContentType="emailAddress"
      />
      <TextInput
        value={formData.cpf}
        onChangeText={(text) => handleChange('cpf', text)}
        placeholder="CPF"
        autoCapitalize="none"
        keyboardType="number-pad"
        textContentType="none"
      />
      <TextInput
        value={formData.phone}
        onChangeText={(text) => handleChange('phone', text)}
        placeholder="Telefone"
        autoCapitalize="none"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
      />
      <TextInput
          value={formData.password}
          onChangeText={(text) => handleChange('password', text)}
          placeholder="Senha"
          secureTextEntry
      />
      <Button loading={loading} onPress={handleCreateUser} style={{ marginTop: 20 }}>
        Cadastrar
      </Button>
    </View>
  );
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
});