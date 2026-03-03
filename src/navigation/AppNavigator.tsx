import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';
import Loading from '../screens/Loading';
import { getToken } from '../utils';
import { useStore } from '../store';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  const { isLoading, token, isSignout, restoreToken, stopLoading } = useStore.auth();

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const appToken = await getToken();
        if (appToken) {
          restoreToken(appToken);
        } else {
          stopLoading();
        }
      } catch (e) {
       stopLoading();
      }
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoading ? (
          <Stack.Screen name="Loading" component={Loading} />
        ) : token == null ? (
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{ animationTypeForReplace: isSignout ? 'pop' : 'push' }}/>
        ) : (
          <Stack.Screen name="App" component={AppStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
