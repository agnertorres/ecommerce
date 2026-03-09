import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShoppingCartStackParamList } from '../types/navigation';
import { useCartSummary } from '../store/useShoppingCartStore';

import ShoppingCartScreen from '../screens/checkout/ShoppingCart';
import ShippingAddressScreen from '../screens/checkout/ShippingAddress';
import PaymentMethodScreen from '../screens/checkout/PaymentMethod';
import OrderConfirmationScreen from '../screens/checkout/OrderConfirmation';
import CheckoutSuccessScreen from '../screens/checkout/CheckoutSuccessScreen';
import SelectInstallmentsScreen from '../screens/checkout/SelectInstallments';
import { blue, white } from '../components/ui/colors';

const Stack = createNativeStackNavigator<ShoppingCartStackParamList>();

export default function ShoppingCartStack() {
  const { totalItems } = useCartSummary();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ShoppingCart"
        component={ShoppingCartScreen}
        options={{
          headerTitle: `Carrinho (${totalItems})`,
          headerTintColor: white,
          headerStyle: { backgroundColor: blue},
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="ShippingAddress"
        component={ShippingAddressScreen}
        options={{
          headerTitle: `Endereço de entrega`,
          headerTintColor: white,
          headerStyle: { backgroundColor: blue},
          headerBackButtonDisplayMode: 'minimal',
          headerBackButtonMenuEnabled: false,
        }}
      />
      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethodScreen}
        options={{
          headerTitle: `Forma da pagamento`,
          headerTintColor: white,
          headerStyle: { backgroundColor: blue},
          headerBackButtonDisplayMode: 'minimal',
          headerBackButtonMenuEnabled: false,
        }}
      />
      <Stack.Screen
        name="SelectInstallments"
        component={SelectInstallmentsScreen}
        options={{
          headerTitle: `Parcelamento`,
          headerTintColor: white,
          headerStyle: { backgroundColor: blue },
          headerBackButtonDisplayMode: 'minimal',
          headerBackButtonMenuEnabled: false,
        }}
      />
      <Stack.Screen
        name="OrderConfirmation"
        component={OrderConfirmationScreen}
        options={{
          headerTitle: `Confirmação do pedido`,
          headerTintColor: white,
          headerStyle: { backgroundColor: blue },
          headerBackButtonDisplayMode: 'minimal',
          headerBackButtonMenuEnabled: false,
        }}
      />
      <Stack.Screen
        name="CheckoutSuccess"
        component={CheckoutSuccessScreen}
        options={{
          headerTitle: `Pedido confirmado`,
          headerTintColor: white,
          headerStyle: { backgroundColor: blue },
          headerBackButtonDisplayMode: 'minimal',
          headerBackButtonMenuEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}