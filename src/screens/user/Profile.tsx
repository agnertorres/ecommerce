import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../../store/';
import Modal from '../../components/Profile/Modal';
import AccountData from '../../components/Profile/AccountData';
import { Pencil } from 'lucide-react-native';
import { blue, gray, lightBlue } from '../../components/ui/colors';
import AvatarModal from '../../components/Profile/AvatarModal';
import AvatarImage from '../../components/Profile/AvatarImage';
import { useState } from 'react';

export default function ProfileScreen() {
  const [visible, setVisible] = useState(false);
  const safeAreaInsets = useSafeAreaInsets();
  const { showModal } = useStore.profileModal();
  const { user } = useStore.user();

  return (
    <View style={styles.container}>
      <AvatarModal
        visible={visible}
        setVisible={setVisible}
      />
      <Modal />
      <View style={[styles.header, { paddingTop: safeAreaInsets.top }]}>
        <View style={styles.avatarContainer}>
          <AvatarImage
            uri={user.imageUrl}
            style={{ width: 80, height: 80, borderRadius: 40, borderWidth: 1.5, borderColor: gray }}
          />
        <TouchableOpacity style={styles.changeAvatarButton} onPress={() => setVisible(!visible)}>
          <Pencil size={16} strokeWidth={2} color={blue}/>
        </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>{user.name}</Text>
        <Text style={styles.headerSubtitle}>{user.email}</Text>
      </View>
      <ScrollView style={styles.content}>
        <AccountData />
        <TouchableOpacity style={styles.button} onPress={() => showModal(true)}>
          <Text style={styles.buttonText}>Sair da conta</Text>
        </TouchableOpacity>
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
    backgroundColor: blue,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  changeAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 25,
    backgroundColor: lightBlue,
    borderWidth: 1.4,
    borderColor: blue,
    borderRadius: 15,
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
    width: '100%',
    paddingHorizontal: 15,
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
