import { useStore } from '../../store';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert } from 'react-native';
import { Pencil, X } from 'lucide-react-native';
import { gray, lightBlack, darkGray } from '../ui/colors';
import { pickAvatar } from '../../utils/pickAvatar';
import AvatarImage from './AvatarImage';

interface AvatarModalProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export default function AvatarModal({
  visible,
  setVisible,
}: AvatarModalProps) {
  const { user, avatar, uploadAvatar, clearAvatar } = useStore.user();

  const handleUploadAvatar = async () => {
    if (!avatar) return;

    const formData = new FormData();
    formData.append('image', avatar as any);
    formData.append('oldImageUrl', user.imageUrl);

    try {
      uploadAvatar(formData);
      clearAvatar();
      setVisible(false);
    } catch (error) {
      Alert.alert("Erro", "Erro ao subir imagem.");
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={() => setVisible(false)}>
            <X size={28} strokeWidth={1.6} color={darkGray}/>
          </TouchableOpacity>
          <View>
            <AvatarImage
              style={styles.avatar}
              uri={avatar?.uri || user.imageUrl}
            />
            <TouchableOpacity style={styles.changeAvatarButton} onPress={pickAvatar}>
              <Pencil size={25} strokeWidth={1.6} color={darkGray}/>
            </TouchableOpacity>
          </View>
          {
            avatar && (
              <TouchableOpacity style={[styles.button, styles.saveAvatarButton]} onPress={handleUploadAvatar}>
                <Text style={{ color: lightBlack, fontWeight: 500, fontSize: 16 }}>Salvar</Text>
              </TouchableOpacity>
            )
          }
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#252525c8',
  },
  modalView: {
    margin: 20,
    padding: 15,
    alignItems: 'center',
    gap: 20,
  },
  avatar: {
    width: 270,
    height: 270,
    borderRadius: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  changeAvatarButton: {
    position: 'absolute',
    bottom: 30,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: gray,
    borderRadius: 40,
  },
  button: {
    backgroundColor: gray,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  saveAvatarButton: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  closeButton: {
    borderRadius: 20,
    padding: 5,
  }
});