import { StyleSheet, Text, View } from 'react-native';
import ScreenSafeWrapper from '../components/Utils/ScreenSafeWrapper';

export default function ShoppingCartScreen() {

  return (
    <ScreenSafeWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>ShoppingCart</Text>
       </View>
     </ScreenSafeWrapper>
   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});