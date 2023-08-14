const {default: Toast} = require('react-native-root-toast');
const {colors, appStyles} = require('../../services');

export const Success = text => {
  Toast.show(text ? text : 'Toast Message', {
    backgroundColor: colors.black,
    textColor: colors.white,
    textStyle: [appStyles.h6],
    duration: 2000,
    shadow: false,
    // shadowColor: colors.appBgColor1
  });
};
export const Error = text => {
  Toast.show(text ? text : 'Toast Message', {
    backgroundColor: colors.fire,
    textColor: colors.white,
    textStyle: [appStyles.h6],
    duration: 2000,
    shadow: false,
    // shadowColor: colors.appBgColor1
  });
};
