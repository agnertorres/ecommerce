import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductDetailScreen from '../screens/ProductDetail';
import HomeTabSection from './HomeTabSection';
import EditProfileScreen from '../screens/EditProfile';

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
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerTitle: 'Alterar Endereço',
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