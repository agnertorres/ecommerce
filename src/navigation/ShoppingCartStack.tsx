import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShoppingCartStackParamList } from '../types/navigation';
import { selectCartTotalItems } from '../store/slices/shoppingCartSlice';

import ShoppingCartScreen from '../screens/ShoppingCart';
import ShippingAddressScreen from '../screens/ShippingAddress';
import PaymentMethodScreen from '../screens/PaymentMethod';
import OrderConfirmationScreen from '../screens/OrderConfirmation';
import CheckoutSuccessScreen from '../screens/CheckoutSuccessScreen';

const Stack = createNativeStackNavigator<ShoppingCartStackParamList>();

export default function ShoppingCartStack() {
  const cartBadgeCount = useSelector(selectCartTotalItems);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ShoppingCart"
        component={ShoppingCartScreen}
        options={{
          headerTitle: `Carrinho (${cartBadgeCount})`,
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: '#007BFF'},
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="ShippingAddress"
        component={ShippingAddressScreen}
        options={{
          headerTitle: `Endereço de entrega`,
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: '#007BFF'},
          headerBackButtonDisplayMode: 'minimal',
          headerBackButtonMenuEnabled: false,
        }}
      />
      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethodScreen}
        options={{
          headerTitle: `Forma da pagamento`,
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: '#007BFF'},
          headerBackButtonDisplayMode: 'minimal',
          headerBackButtonMenuEnabled: false,
        }}
      />
      <Stack.Screen
        name="OrderConfirmation"
        component={OrderConfirmationScreen}
        options={{
          headerTitle: `Confirmação do pedido`,
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: '#007BFF'},
          headerBackButtonDisplayMode: 'minimal',
          headerBackButtonMenuEnabled: false,
        }}
      />
      <Stack.Screen
        name="CheckoutSuccess"
        component={CheckoutSuccessScreen}
        options={{
          headerTitle: `Confirmação do pedido`,
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: '#007BFF'},
          headerBackButtonDisplayMode: 'minimal',
          headerBackButtonMenuEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}