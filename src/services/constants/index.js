import {colors} from '../utilities/colors';
import {appStyles} from '../utilities/appStyles';

export const baseURL = '';
export const endPoints = {
  login: 'login',
  courses: 'rooms',
  classes: 'classes',
};
export const routes = {
  welcome: 'Welcome',
  auth: 'auth',
  app: 'app',
  splash: 'splash',
  signin: 'signin',
  signup: 'signup',
  home: 'home',
  addTrips: 'Add Trips',
  addExpense: 'Add Expense',
  tripExpense: 'Trip Expense',
  forgotPassword: 'forgotPassword',
  AccountSettings: 'Account Settings',
  PhoneVerification: 'PhoneVerification',
  CodeVerification: 'CodeVerification',
};
export const headers = {
  screenOptions: {
    // headerShown: false,
    title: 'Title',
    headerTitleAlign: 'center',
    headerStyle: [appStyles.headerStyle],
    headerTitleStyle: appStyles.headerTitleStyle,
    headerTintColor: colors.appTextColor4,
    headerBackTitle: ' ',
  },
};
export const tabs = {
  tabBarOptions: {
    showLabel: false,
    tabBarActiveTintColor: colors.appColor1,
    tabBarInactiveTintColor: colors.appBgColor3,
    allowFontScaling: true,
    tabBarStyle: appStyles.tabBarStyle,
    activeBackgroundColor: '#FFFFFF40',
    tabStyle: {borderRadius: 20, marginHorizontal: 7.5, marginVertical: 2},
  },
};

export const categories = [
  // 'Food',
  // 'Shopping',
  // 'Entertainment',
  // 'Commute',
  // 'Other',
  {id: 1, label: 'Food', value: 'food'},
  {id: 2, label: 'Shopping', value: 'Shopping'},
  {id: 3, label: 'Entertainment', value: 'Entertainment'},
  {id: 4, label: 'Commute', value: 'Commute'},
  {id: 5, label: 'Other', value: 'Other'},
];
