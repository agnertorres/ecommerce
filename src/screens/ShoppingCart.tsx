import { StyleSheet, Text, View } from 'react-native';

export default function ShoppingCart() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ShoppingCart</Text>
     </View>
   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});