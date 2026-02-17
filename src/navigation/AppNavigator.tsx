import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootState, AppDispatch } from '../store'
import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';
import Loading from '../screens/Loading';

import { restoreToken } from '../store/slices/authSlice';

const getToken = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('fake-token');
    }, 1000);
  });
};

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, token, isSignout } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await getToken();
      } catch (e) {
        console.error('Failed to restore token', e);
      }

      dispatch(restoreToken({ token: userToken }));
    }

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
