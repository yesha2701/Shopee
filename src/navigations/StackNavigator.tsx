import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnBoarding from '../screens/OnBoarding';
import Registration from '../screens/Registration';
import { RootStackParamList } from '../types/navigationType';
import Login from '../screens/Login';
import BottomNavigator from './BottomNavigator';
import Form from '../screens/Form';

const Stack = createStackNavigator<RootStackParamList>();
const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
        <Stack.Screen name="Form" component={Form} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
