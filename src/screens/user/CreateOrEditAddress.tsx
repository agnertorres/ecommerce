import React, { useState, useEffect } from 'react';
import { useAddressById } from '../../store/useUserStore';
import { useStore } from '../../store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Trash2 } from 'lucide-react-native';
import { Button } from '../../components/ui/components';

import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Switch } from 'react-native';

import { ProfileStackParamList } from '../../types/navigation';
import { blue, darkGray, gray, lightRed } from '../../components/ui/colors';

type CreateOrEditAddressProps = NativeStackScreenProps<ProfileStackParamList, 'CreateOrEditAddress'>;

export default function CreateOrEditAddressScreen({ route }: CreateOrEditAddressProps) {
  const { id } = route.params || {};
  const address = useAddressById(id);
  const { user, loading, addAddress, editAddress, removeAddress } = useStore.user();

  const navigation = useNavigation<NativeStackNavigationProp<CreateOrEditAddressProps>>();

  const [formData, setFormData] = useState({
    zipcode: '',
    city: '',
    state: '',
    street: '',
    number: '',
    complement: '',
    isDefault: false,
  });

  useEffect(() => {
    if (id && address) {
      setFormData({
        zipcode: address.zipcode,
        city: address.city,
        state: address.state,
        street: address.street,
        number: address.number,
        complement: address.complement || '',
        isDefault: address.isDefault,
      });
    }
  }, [id, address]);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    id ? editAddress(user?.id, address.id, formData) : addAddress(user?.id, formData);
    navigation.goBack();
  };

  const handleRemoveAddress= async () => {
    Alert.alert(
      "Excluir Endereço",
      address.isDefault 
        ? "Este é seu endereço de entrega. Se excluí-lo, outro será escolhido como endereço de entrega. Confirmar?" 
        : "Tem certeza que deseja remover este endereço?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          style: "destructive", 
          onPress: () => {
            removeAddress(user.id, address.id);
            navigation.goBack();
          }
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{address ? 'Alterar informações do endereço' : 'Cadastrar novo endereço'}</Text>
      <TextInput
        value={formData.zipcode}
        onChangeText={(text) => handleChange('zipcode', text)}
        style={styles.input}
        placeholder={'CEP'}
        keyboardType="numeric"
      />
      <TextInput
        value={formData.city}
        onChangeText={(text) => handleChange('city', text)}
        style={styles.input}
        placeholder={'Cidade'}
      />
      <TextInput
        value={formData.state}
        onChangeText={(text) => handleChange('state', text)}
        style={styles.input}
        placeholder={'Estado'}
      />
      <TextInput
        value={formData.street}
        onChangeText={(text) => handleChange('street', text)}
        style={styles.input}
        placeholder={'Rua ou avenida'}
      />
      <TextInput
        value={formData.number}
        onChangeText={(text) => handleChange('number', text)}
        style={styles.input}
        placeholder={'Número'}
        keyboardType="numeric"
      />
      <TextInput
        value={formData.complement}
        onChangeText={(text) => handleChange('complement', text)}
        style={styles.input}
        placeholder={'Complemento (opicional)'}
      />
      <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems: 'center', width: '100%', marginTop: 15, gap: 10 }}>
        <View style={{ gap: 10 }}>
          <Text style={styles.title}>Endereço de entrega?</Text>
          <Switch
            trackColor={{false: '#ccc', true: blue }}
            thumbColor={gray}
            ios_backgroundColor={'#fff'}
            onValueChange={(value) => handleChange('isDefault', value)}
            value={formData.isDefault}
          />
        </View>
        {
          id ? (
            <TouchableOpacity style={styles.removeAddress} onPress={handleRemoveAddress}>
              <Trash2 color={lightRed} size={35} strokeWidth={1.6} />
            </TouchableOpacity>
          ): ''
        }
      </View>
      <Button style={styles.button} onPress={handleSubmit} loading={loading}>
         <Text style={styles.buttonText}>{id ? 'Salvar' : 'Cadastrar endereço'}</Text>
      </Button>
      <Button disabled={loading} style={styles.cancel} onPress={navigation.goBack}>
         <Text style={styles.buttonText}>Cancelar</Text>
      </Button>
    </View>
  );
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
    marginTop: 20,
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
    backgroundColor: '#ccc',
    marginTop: 10,
  },
  removeAddress: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    shadowColor: darkGray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  }
});