import { StyleSheet } from 'react-native';
import { colors } from '../Themes/Colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../Themes/Metrics';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: verticalScale(40),
    paddingHorizontal: horizontalScale(15),
    rowGap: verticalScale(12),
  },
  image: {
    width: horizontalScale(345),
    height: verticalScale(410),
    borderWidth: moderateScale(1),
    borderColor: colors.lightGrey,
    borderRadius: moderateScale(10),
    shadowOffset: { width: 0, height: 5 },
    shadowColor: colors.black,
    shadowOpacity: moderateScale(0.2),
    shadowRadius: moderateScale(10),
  },
  detailView: {
    rowGap: verticalScale(10),
  },
  title: {
    fontSize: moderateScale(17),
    fontWeight: '700',
    letterSpacing: moderateScale(1),
  },
  price: {
    fontSize: moderateScale(30),
    fontWeight: '800',
  },
  description: {
    fontSize: moderateScale(15),
    fontWeight: '400',
    letterSpacing: moderateScale(1),
  },
});
