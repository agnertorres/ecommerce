import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductDetailScreen from '../screens/Product';
import HomeTabSection from './HomeTabSection';
import AddressListScreen from '../screens/user/AddressList';
import CreateOrEditAddressScreen from '../screens/user/CreateOrEditAddress';

import { HomeStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTabSection"
        component={HomeTabSection}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{
          headerShown: false
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