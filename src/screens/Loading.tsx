import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export default function Loading() {
  return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#7b7b7b" />
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
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
  }
});