import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../../store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../types/navigation';

import { Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native';

import { styles as editProfileStyles } from './EditProfile';
type CreateCreditCardProps = NativeStackScreenProps<ProfileStackParamList, 'CreateCreditCard'>;

export default function CreateCreditCardScreen() {
  const { user } = useStore.user();
  const { addPaymentMethod, loading } = useStore.payment();

  const navigation = useNavigation<NativeStackNavigationProp<CreateCreditCardProps>>();

  const [creditCardInfoData, setCreditCardInfoData] = useState({
    creditCardNumber: '',
    expirationYear: '',
    expirationMonth: '',
    cvv: '',
    name: '',
    brand: '',
  });

  const handleChange = (field: string, value: string) => {
    setCreditCardInfoData(prev => ({ ...prev, [field]: value }));
  };

  const validateFields = () => {
    if (!creditCardInfoData.creditCardNumber) {
      Alert.alert('Informe o número do cartão');
      return false;
    }

    if (!creditCardInfoData.expirationYear || !creditCardInfoData.expirationMonth) {
      Alert.alert('Informe o mês e o ano de expiração');
      return false;
    }

    if (!creditCardInfoData.cvv) {
      Alert.alert('Informe o cvv');
      return false;
    }

    if (!creditCardInfoData.name) {
      Alert.alert('Informe o nome impresso no cartão');
      return false;
    }

    if (!creditCardInfoData.brand) {
      Alert.alert('Informe a narca do cartão');
      return false;
    }

    return true;
  }

  const handleCreateCreditCard = () => {
    const isValidFields = validateFields();

    if(!isValidFields) {
      return;
    }

    addPaymentMethod(user.id, creditCardInfoData);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informe os dados do cartão</Text>
      <TextInput
        value={creditCardInfoData.creditCardNumber}
        onChangeText={(text) => handleChange('creditCardNumber', text)}
        style={styles.input}
        placeholder={'Número do cartão'}
        autoCapitalize="none"
        maxLength={16}
        autoFocus={true}
        editable={!loading}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', gap: 15}}>
        <TextInput
          value={creditCardInfoData.expirationMonth}
          onChangeText={(text) => handleChange('expirationMonth', text)}
          style={styles.expirationDate}
          placeholder={'MM'}
          autoCapitalize="none"
          maxLength={2}
          editable={!loading}
        />
        <TextInput
          value={creditCardInfoData.expirationYear}
          onChangeText={(text) => handleChange('expirationYear', text)}
          style={styles.expirationDate}
          placeholder={'AA'}
          autoCapitalize="none"
          maxLength={2}
          editable={!loading}
        />
        <TextInput
          value={creditCardInfoData.cvv}
          onChangeText={(text) => handleChange('cvv', text)}
          style={styles.cvv}
          placeholder={'CVV'}
          autoCapitalize="none"
          maxLength={3}
          editable={!loading}
        />
      </View>
      <TextInput
        value={creditCardInfoData.name}
        onChangeText={(text) => handleChange('name', text)}
        style={styles.input}
        placeholder={'Nome impresso no cartão'}
        autoCapitalize="none"
        maxLength={50}
        editable={!loading}
      />
      <TextInput
        value={creditCardInfoData.brand}
        onChangeText={(text) => handleChange('brand', text)}
        style={styles.input}
        placeholder={'Marca (mastercard, visa)'}
        autoCapitalize="none"
        maxLength={30}
        editable={!loading}
      />
      <TouchableOpacity
        style={loading ? [styles.button, styles.disabled] : styles.button}
        onPress={handleCreateCreditCard}
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

  return <Text style={styles.buttonText}>Salvar cartão</Text>
}

const styles = StyleSheet.create({
  ...editProfileStyles,
  expirationDate: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    maxWidth: 47
  },
  cvv: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    maxWidth: 52
  }
});

