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
    paddingTop: moderateScale(50),
    paddingHorizontal: horizontalScale(15),
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: horizontalScale(10),
  },
  topTitle: {
    fontSize: moderateScale(28),
    fontWeight: '700',
  },
  topSearch: {
    flexShrink: 1,
  },
  categoryView: {
    gap: moderateScale(15),
  },
  categoryText: {
    fontSize: moderateScale(21),
    fontWeight: '700',
    letterSpacing: moderateScale(1),
  },
  categoryImgView: {
    flexDirection: 'row',
    marginBottom: verticalScale(15),
  },
  categoryBtn: {
    marginRight: horizontalScale(10),
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  imgView: {
    padding: moderateScale(5),
    borderRadius: moderateScale(45),
    borderWidth: 1,
    borderColor: colors.lightGrey,
    marginBottom: verticalScale(3),
  },
  categoriesImg: {
    height: verticalScale(60),
    width: horizontalScale(60),
    borderRadius: moderateScale(45),
  },
  itemView: {
    rowGap: verticalScale(15),
  },
  listView: {
    flex: 0.5,
    padding: 10,
    rowGap: verticalScale(10),
    shadowOffset: { width: 0, height: 5 },
    shadowColor: colors.black,
    shadowOpacity: moderateScale(0.2),
    shadowRadius: moderateScale(10),
  },
  listImgView: {
    borderWidth: moderateScale(1),
    alignItems: 'center',
    borderColor: colors.lightGrey,
    borderRadius: moderateScale(10),
  },
  listImg: {
    width: horizontalScale(135),
    height: verticalScale(160),
    borderRadius: moderateScale(10),
    margin: moderateScale(10),
  },
  listText: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    letterSpacing: moderateScale(1),
  },
  listPrice: {
    fontSize: moderateScale(17),
    fontWeight: '700',
  },
  iconView: {
    flexDirection: 'row',
    paddingTop: verticalScale(10),
    paddingRight: horizontalScale(10),
    alignSelf: 'flex-end',
    columnGap: horizontalScale(7),
  },
  insertVew: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    padding: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicater: {
    margin: moderateScale(5),
  },
  footerText: {
    color: colors.lightGrey,
  },
});
