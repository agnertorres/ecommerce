import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export default function Loading() {
  return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#c3c3c3" />
      <Text style={styles.title}>Carregando...</Text>
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
    marginTop: 10,
  }
});