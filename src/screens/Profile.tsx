import { useNavigation } from '@react-navigation/native';
import { EditFieldProps } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../types/navigation';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserStore } from '../store/useUserStore';
import { useProfileModalStore } from '../store/useProfileModalStore';

import Modal from '../components/Profile/Modal';
import PersonalInformation from '../components/Profile/PersonalInformation';
import AccountData from '../components/Profile/AccountData';

export default function ProfileScreen() {
  const safeAreaInsets = useSafeAreaInsets();

  const { user } = useUserStore();
  const { showModal } = useProfileModalStore();

  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
  
  const editField = ({ field, value }: EditFieldProps) => {

    if (field === 'password') {
      navigation.navigate('ChangePassword');
      return;
    }

    navigation.navigate('EditProfile', { field, value });
  }

  return (
    <View style={styles.container}>
      <Modal />
      <View style={[styles.header, { paddingTop: safeAreaInsets.top }]}>
        <Image
          source={{ uri: 'https://avatars.githubusercontent.com/u/12345678?v=4' }}
          style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 10 }}
        />
        <Text style={styles.headerTitle}>João da Silva</Text>
        <Text style={styles.headerSubtitle}>joaosilva@gmail.com</Text>
      </View>
      <ScrollView style={styles.content}>
        <PersonalInformation user={user} editField={editField} />
        <AccountData user={user} editField={editField} />
        <View>
          <TouchableOpacity style={styles.button} onPress={() => showModal(true)}>
            <Text style={styles.buttonText}>Sair da conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

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
    height: 230,
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
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#f50247',
    fontSize: 16,
  },
});
