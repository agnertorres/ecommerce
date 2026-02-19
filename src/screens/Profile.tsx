import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { showModal } from '../store/slices/profileModalSlice';

import Modal from '../components/Profile/Modal';
import PersonalInformation from '../components/Profile/PersonalInformation';
import AccountData from '../components/Profile/AccountData';

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const safeAreaInsets = useSafeAreaInsets();
  
  const { data } = useSelector((state: RootState) => state.user);

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
        <PersonalInformation user={data}/>
        <AccountData user={data} />
        <View>
          <TouchableOpacity style={styles.button} onPress={() => dispatch(showModal(true))}>
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
