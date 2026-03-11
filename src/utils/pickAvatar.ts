import { launchImageLibrary } from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import { Platform, Alert } from 'react-native';
import { useStore } from '../store';

export const pickAvatar = async () => {
  try {
    const result = await launchImageLibrary({ 
      mediaType: 'photo',
      selectionLimit: 1 
    });

    if (result.didCancel || !result.assets) return;

    const asset = result.assets[0];

    const { setAvatar } = useStore.user.getState();
    
    const resized = await ImageResizer.createResizedImage(
      asset.uri,
      400, 400, 'JPEG', 80, 0, null
    );

    const avatarObject = {
      uri: Platform.OS === 'ios' ? resized.uri.replace('file://', '') : resized.uri,
      type: 'image/jpeg',
      name: `avatar-${Date.now()}.jpg`,
    };

    setAvatar(avatarObject);
  } catch (error) {
    Alert.alert("Erro", "Não foi possível processar a foto do perfil.");
  }
};