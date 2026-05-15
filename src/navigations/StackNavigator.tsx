import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnBoarding from '../screens/OnBoarding';
import Registration from '../screens/Registration';
import { RootStackParamList } from '../types/navigationType';
import Login from '../screens/Login';
import BottomNavigator from './BottomNavigator';
import Form from '../screens/Form';
import * as Keychain from 'react-native-keychain';
import { useEffect, useState } from 'react';

const Stack = createStackNavigator<RootStackParamList>();
const StackNavigator = () => {
  const [user, setUser] = useState(false);

  const getAuthToken = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        setUser(true);
        return credentials.username && credentials.password;
      }
      return null;
    } catch (error) {
      console.error('Failed to retrieve token', error);
      return null;
    }
  };

  useEffect(() => {
    getAuthToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
        ) : (
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
        )}
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Form" component={Form} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
