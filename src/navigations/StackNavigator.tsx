import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnBoarding from '../screens/OnBoarding';
import Registration from '../screens/Registration';
import { RootStackParamList } from '../types/navigationType';
import Login from '../screens/Login';
import BottomNavigator from './BottomNavigator';
import Form from '../screens/Form';
import { useAuth } from '../contexts/AuthContext';

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  const { isLoggedIn } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
            <Stack.Screen name="Form" component={Form} />
          </>
        ) : (
          <>
            <Stack.Screen name="OnBoarding" component={OnBoarding} />
            <Stack.Screen name="Registration" component={Registration} />
            <Stack.Screen name="Login" component={Login} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
