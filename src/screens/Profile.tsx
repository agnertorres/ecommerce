import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { signOut } from '../store/slices/authSlice';

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();

  const handleSignout = () => {
    dispatch(signOut());
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
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
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});