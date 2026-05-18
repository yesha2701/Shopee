import { Todo } from '../redux/slice/itemsSlice';

export type RootStackParamList = {
  OnBoarding: undefined;
  Registration: undefined;
  Login: undefined;
  BottomNavigator: { screen: string } | undefined;
  Home: undefined;
  Details: undefined;
  Profile: { item: Todo } | undefined;
  Form: { item: Todo; isEdit: boolean } | undefined;
};
