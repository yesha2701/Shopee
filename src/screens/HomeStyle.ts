import { StyleSheet } from 'react-native';
import { colors } from '../Themes/Colors';
import { moderateScale, verticalScale } from '../Themes/Metrics';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: moderateScale(20),
  },
  topView: {
    marginTop: verticalScale(40),
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
});
