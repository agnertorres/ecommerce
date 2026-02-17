import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home, User, ShoppingCart } from 'lucide-react-native';

import ProfileScreen from '../screens/Profile';
import HomeScreen from '../screens/Home';
import ShoppingCartScreen from '../screens/ShoppingCart';

const Tab = createBottomTabNavigator();

const tabBarActiveTintColor = '#007AFF';
const tabBarInactiveTintColor = 'gray';

export function AppStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor,
        tabBarInactiveTintColor,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
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
          tabBarBadge: 1,
          headerShown: false,
          tabBarLabel: 'Carrinho',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
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
