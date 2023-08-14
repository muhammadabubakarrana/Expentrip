import Toast from 'react-native-toast-message';

export const ShowToast = () => {
  Toast.show({
    type: 'success',
    text1: 'Error',
    text2: 'Please Fill All Fields 👋',
  });
};
