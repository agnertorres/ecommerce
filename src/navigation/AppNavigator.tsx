import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';
import Loading from '../screens/Loading';
import { useStore } from '../store';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  const { restoreTokenLoading, token, restoreToken } = useStore.auth();

  useEffect(() => {
    restoreToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {restoreTokenLoading ? (
          <Stack.Screen name="Loading" component={Loading} />
        ) : token == null ? (
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{ animationTypeForReplace: token ? 'pop' : 'push' }}/>
        ) : (
          <Stack.Screen name="App" component={AppStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
