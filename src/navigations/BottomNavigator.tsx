/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import Profile from '../screens/Profile';
import { Image, View } from 'react-native';
import { icons } from '../../assets/icons';
import { colors } from '../Themes/Colors';

const Tab = createBottomTabNavigator();
const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.black,
        tabBarInactiveTintColor: colors.primary,
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
                  style={{ tintColor: focused ? colors.black : colors.primary }}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Details"
        component={Detail}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Image
                  source={icons.details}
                  style={{ tintColor: focused ? colors.black : colors.primary }}
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
                  style={{ tintColor: focused ? colors.black : colors.primary }}
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
