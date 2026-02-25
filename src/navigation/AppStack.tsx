import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { selectCartTotalItems } from '../store/slices/shoppingCartSlice';
import { Home, User, ShoppingCart, ShoppingBag } from 'lucide-react-native';

import ShoppingCartScreen from '../screens/ShoppingCart';

import HomeStack from './HomeStack';
import OrdersStack from './OrdersStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

const tabBarActiveTintColor = '#007AFF';
const tabBarInactiveTintColor = 'gray';

export function AppStack() {
  const cartBadgeCount = useSelector(selectCartTotalItems);

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
        name="ShoppingCart"
        component={ShoppingCartScreen}
        options={{
          tabBarIcon: ({ color, size, }) => (
            <ShoppingCart color={color} size={size} strokeWidth={1.5} />
          ),
          tabBarBadge: (
            cartBadgeCount > 0 
              ? cartBadgeCount > 99 
                ? '...'
                : cartBadgeCount
              : undefined
          ),
          headerTitle: `Carrinho (${cartBadgeCount})`,
          headerTintColor: '#FFF',
          headerStyle: { backgroundColor: '#007BFF'},
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
