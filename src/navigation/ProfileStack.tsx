import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../screens/user/Profile';
import EditProfileScreen from '../screens/user/EditProfile';
import ChangePasswordScreen from '../screens/auth/ChangePassword';
import CreateOrEditAddressScreen from '../screens/user/CreateOrEditAddress';
import AddressListScreen from '../screens/user/AddressList';

import { ProfileStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ 
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen}
        options={{
            headerTitle: 'Alterar',
            headerTintColor: '#FFF',
            headerStyle: { backgroundColor: '#007BFF'},
            headerBackButtonDisplayMode: 'minimal',
            headerBackVisible: false,
            headerBackButtonMenuEnabled: false,
        }} 
      />
      <Stack.Screen 
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
            headerTitle: 'Alterar',
            headerTintColor: '#FFF',
            headerStyle: { backgroundColor: '#007BFF'},
            headerBackButtonDisplayMode: 'minimal',
            headerBackVisible: false,
            headerBackButtonMenuEnabled: false,
        }} 
      />
      <Stack.Screen 
        name="AddressList" 
        component={AddressListScreen}
        options={{
            headerTitle: 'Endereços cadastrados',
            headerTintColor: '#FFF',
            headerStyle: { backgroundColor: '#007BFF'},
            headerBackButtonDisplayMode: 'minimal',
            headerBackButtonMenuEnabled: false,
        }} 
      />
      <Stack.Screen 
        name="CreateOrEditAddress" 
        component={CreateOrEditAddressScreen}
        options={{
            headerTitle: 'Endereço',
            headerTintColor: '#FFF',
            headerStyle: { backgroundColor: '#007BFF'},
            headerBackButtonDisplayMode: 'minimal',
            headerBackVisible: false,
            headerBackButtonMenuEnabled: false,
        }} 
      />
    </Stack.Navigator>
  );
}