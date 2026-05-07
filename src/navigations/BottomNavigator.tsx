/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Details from '../screens/Details';
import Profile from '../screens/Profile';
import { Image, View } from 'react-native';
import { icons } from '../../assets/icons';
import { colors } from '../Themes/Colors';

const Tab = createBottomTabNavigator();
const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.black,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Image
                  source={icons.shop}
                  style={{ tintColor: focused ? colors.primary : colors.black }}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Details"
        component={Details}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Image
                  source={icons.details}
                  style={{ tintColor: focused ? colors.primary : colors.black }}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Image
                  source={icons.profile}
                  style={{ tintColor: focused ? colors.primary : colors.black }}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
