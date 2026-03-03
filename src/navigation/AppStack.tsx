import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useCartSummary } from '../store/useShoppingCartStore';
import { Home, User, ShoppingCart, ShoppingBag } from 'lucide-react-native';

import HomeStack from './HomeStack';
import OrdersStack from './OrdersStack';
import ProfileStack from './ProfileStack';
import ShoppingCartStack from './ShoppingCartStack';

const Tab = createBottomTabNavigator();

const tabBarActiveTintColor = '#007AFF';
const tabBarInactiveTintColor = 'gray';

export function AppStack() {
  const { totalItems } = useCartSummary();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor,
        tabBarInactiveTintColor,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size, }) => (
            <Home color={color} size={size} strokeWidth={1.5} />
          ),
          headerShown: false,
          tabBarLabel: 'Início',
        }}
      />
      <Tab.Screen
        name="ShoppingCartStack"
        component={ShoppingCartStack}
        options={{
          tabBarIcon: ({ color, size, }) => (
            <ShoppingCart color={color} size={size} strokeWidth={1.5} />
          ),
          tabBarBadge: (
            totalItems > 0 
              ? totalItems > 99 
                ? '...'
                : totalItems
              : undefined
          ),
          headerShown: false,
          tabBarLabel: 'Carrinho', 
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersStack}
        options={{
          tabBarIcon: ({ color, size, }) => (
            <ShoppingBag color={color} size={size} strokeWidth={1.5} />
          ),
          headerShown: false,
          tabBarLabel: 'Minhas compras',
        }}
      />
      <Tab.Screen
        name="MyAccount"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} strokeWidth={1.5} />
          ),
          headerShown: false,
          tabBarLabel: 'Minha conta',
        }}
      />
    </Tab.Navigator>
  );
}
