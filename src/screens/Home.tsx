import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { strings } from '../utilities/strings';
import { styles } from './HomeStyle';
import { CustomArrowButton } from '../components/CustomArrowButton';
import { icons } from '../../assets/icons';

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.helloStyle}>{strings.greet}</Text>
        <TouchableOpacity>
          <Text style={styles.logoutStyle}>{strings.logout}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.announcementView}>
        <View style={styles.loremView}>
          <Text style={styles.announcementText}>{strings.announcement}</Text>
          <Text style={styles.loremStyle}>{strings.lorem}</Text>
        </View>
        <CustomArrowButton
          source={icons.rightArrow}
          onPress={() => console.log('onpress :>> ')}
        />
      </View>
    </View>
  );
};

export default Home;
