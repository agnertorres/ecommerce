import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/Login';
import RegisterUserScreen from '../screens/auth/RegisterUser';

const Stack = createNativeStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        name="RegisterUser"
        component={RegisterUserScreen}
      />
    </Stack.Navigator>
  );
}
