import { useState, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import { signOut } from '../store/slices/authSlice';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Phone, User, IdCard, MapPin, Mail } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const [modalVisible, setModalVisible] = useState(false);

  const safeAreaInsets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate('Home');
  }

  const handleSignout = () => {
    dispatch(signOut());
  }
  return (
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
        >
          <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>
              <Text style={modalStyles.modalText}>Gostaria de sair da conta?</Text>
              <TouchableOpacity
                style={[modalStyles.button, modalStyles.buttonSignout]}
                onPress={handleSignout}>
                <Text style={modalStyles.textStyle}>Sair da conta</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[modalStyles.button, modalStyles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={modalStyles.textStyle}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={[styles.header, { paddingTop: safeAreaInsets.top }]}>
          <Image
            source={{ uri: 'https://avatars.githubusercontent.com/u/12345678?v=4' }}
            style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 10 }}
          />
          <Text style={styles.headerTitle}>João da Silva</Text>
          <Text style={styles.headerSubtitle}>joaosilva@gmail.com</Text>
        </View>
        <ScrollView style={styles.content}>
          <View>
            <Text style={styles.title}>Informações pessoais</Text>
            <LinkButton
              iconComponent={<IdCard size={30} color="#007BFF" strokeWidth={1} />}
              data="João da Silva"
              description="Nome e sobrenome"
              onPress={() => handleNavigate()}
            />
            <LinkButton
              iconComponent={<IdCard size={30} color="#007BFF" strokeWidth={1} />}
              data="404.999.423.99-99"
              description="Número do CPF"
              onPress={() => handleNavigate()}
            />
            <LinkButton
              iconComponent={<User size={30} color="#007BFF" strokeWidth={1} />}
              data="João"
              description="Nome de preferência"
              onPress={() => handleNavigate()}
            />
            <LinkButton
              iconComponent={<MapPin size={30} color="#007BFF" strokeWidth={1} />}
              data="Rua padre duarte, 289"
              description="Endereço cadastrado"
              onPress={() => handleNavigate()}
            />
          </View>
          <View>
            <Text style={styles.title}>Dados da conta</Text>
            <LinkButton 
              iconComponent={<Mail size={30} color="#007BFF" strokeWidth={1} />}
              data="joaosilva@gmail.com"
              description="E-mail cadastrado"
              onPress={() => handleNavigate()}
            />
            <LinkButton
              iconComponent={<Phone size={30} color="#007BFF" strokeWidth={1} />}
              data="(11) 99999-9999"
              description="Número de telefone"
              onPress={() => handleNavigate()}
            />
          </View>
          <View>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
              <Text style={styles.buttonText}>Sair da conta</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
   );
}

interface LinkButtonProps {
  data: string;
  description: string;
  iconComponent: ReactNode;
  onPress: () => void;
}

const LinkButton = ({ data, description, iconComponent, onPress }: LinkButtonProps) => (
  <TouchableOpacity onPress={onPress} style={styles.linkButton}>
    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ marginRight: 10 }}>
        {iconComponent}
      </View>
      <View>
        <Text style={styles.linkButtonText}>{data}</Text>
        <Text style={styles.linkButtonDescription}>{description}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 250,
    backgroundColor: '#007BFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
  },
  content: {
    flex: 1,
    width: '90%',
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '400',
    color: '#333',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#ff0066',
    fontSize: 16,
  },
  linkButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  linkButtonText: {
    color: '#333',
    fontSize: 16,
  },
  linkButtonDescription: {
    color: '#666',
    fontSize: 14,
  },
});

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4b4b4b8f',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonSignout: {
    backgroundColor: '#ff0066',
  },
  buttonClose: {
    marginTop: 15,
    backgroundColor: '#a1a1a1',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});