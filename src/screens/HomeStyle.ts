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
    padding: moderateScale(15),
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  helloStyle: {
    fontSize: moderateScale(28),
    fontWeight: '700',
    letterSpacing: moderateScale(1),
  },
  logoutStyle: {
    color: colors.red,
    fontSize: moderateScale(13),
    fontWeight: '600',
  },
  announcementView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: moderateScale(8),
    backgroundColor: colors.disable,
    marginVertical: verticalScale(12),
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
  },
  loremView: {
    flex: 1,
  },
  announcementText: {
    fontSize: moderateScale(14),
    fontWeight: '700',
  },
  loremStyle: {
    fontSize: moderateScale(11),
    paddingTop: verticalScale(10),
  },
  carouselItem: {
    flex: 1,
    justifyContent: 'center',
  },
  carouselImg: {
    width: horizontalScale(335),
    height: verticalScale(140),
    borderRadius: moderateScale(10),
  },
  dotContainer: {
    columnGap: horizontalScale(4),
  },
  inactiveDot: {
    backgroundColor: colors.inactive,
    borderRadius: moderateScale(5),
  },
  activeDot: {
    backgroundColor: colors.primary,
  },
  nextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(40),
  },
  nextInnerView: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: horizontalScale(10),
  },
  nextTitle: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    letterSpacing: moderateScale(1),
  },
  seeTitle: {
    fontSize: moderateScale(15),
    fontWeight: '600',
  },
  itemsView: {
    marginTop: verticalScale(25),
  },
  listView: {
    marginRight: horizontalScale(6),
    width: horizontalScale(130),
    rowGap: verticalScale(6),
  },
  listItems: {
    flex: 1,
    rowGap: verticalScale(6),
  },
  listImg: {
    height: verticalScale(130),
    width: horizontalScale(130),
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(10),
    borderColor: colors.lightGrey,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: colors.black,
    shadowOpacity: moderateScale(0.2),
    shadowRadius: moderateScale(10),
  },
  listTitle: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    letterSpacing: moderateScale(1),
  },
  listPrice: {
    fontSize: moderateScale(17),
    fontWeight: '700',
  },
});
