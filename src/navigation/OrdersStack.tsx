import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OrdersScreen from '../screens/Orders';
import OrderDetailScreen from '../screens/OrderDetail';

import { OrderStackParamList } from '../types';

const Stack = createNativeStackNavigator<OrderStackParamList>();

export default function OrdersStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="OrdersList" 
        component={OrdersScreen} 
        options={{ 
          headerTitle: 'Minhas compras',
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: '#007BFF'}
        }} 
      />
      <Stack.Screen 
        name="OrderDetail" 
        component={OrderDetailScreen} 
        options={{
            headerTitle: 'Detalhes do pedido',
          	headerTintColor: '#FFF',
          	headerStyle: { backgroundColor: '#007BFF'},
						headerBackButtonDisplayMode: 'minimal',
        }} 
      />
    </Stack.Navigator>
  );
}