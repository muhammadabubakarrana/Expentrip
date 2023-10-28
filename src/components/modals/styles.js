import {StyleSheet} from 'react-native';
import {sizes, colors, appStyles} from '../../services';

export const styles = StyleSheet.create({
  professionsCard: {
    //borderColor:colors.appBgColor3,
    marginBottom: sizes.marginBottom,
  },
  selectedProfessionsCard: {
    // borderColor:colors.appTextColor1,
    backgroundColor: colors.appBgColor2,
    marginBottom: sizes.marginBottom,
  },

  ////SwipableModal
  swipableModalFooter: {
    backgroundColor: colors.appBgColor1,
    borderTopLeftRadius: sizes.cardRadius,
    borderTopRightRadius: sizes.cardRadius,
    paddingTop: sizes.baseMargin,
    ...appStyles.shadowDark,
  },
  barContainer: {
    top: sizes.TinyMargin,
    alignSelf: 'center',
  },
  //EnterValueModalPrimaryCard
  enterValueModalPrimaryCard: {
    backgroundColor: colors.appBgColor1,
    borderRadius: sizes.modalRadius,
    padding: sizes.baseMargin,
    marginHorizontal: sizes.marginHorizontal * 2,
    ...appStyles.shadow,
  },
  modal: {
    backgroundColor: colors.white,
    borderRadius: 32,
    paddingVertical: 20,
    paddingHorizontal: 20,
    // width: "80%",
    // height: "50%",
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 6,
    elevation: 5,
    shadowOpacity: 1,
    height: 'auto',
  },
  professionsCard: {
    //borderColor:colors.appBgColor3,
    marginBottom: sizes.marginBottom,
  },
  selectedProfessionsCard: {
    // borderColor:colors.appTextColor1,
    backgroundColor: colors.appBgColor2,
    marginBottom: sizes.marginBottom,
  },

  ////SwipableModal
  swipableModalFooter: {
    backgroundColor: colors.appBgColor1,
    borderTopLeftRadius: sizes.cardRadius,
    borderTopRightRadius: sizes.cardRadius,
    paddingTop: sizes.baseMargin,
    ...appStyles.shadowDark,
  },
  barContainer: {
    top: sizes.TinyMargin,
    alignSelf: 'center',
  },
  //EnterValueModalPrimaryCard
  enterValueModalPrimaryCard: {
    backgroundColor: colors.appBgColor1,
    borderRadius: sizes.modalRadius,
    padding: sizes.baseMargin,
    marginHorizontal: sizes.marginHorizontal * 2,
    ...appStyles.shadow,
  },
});
