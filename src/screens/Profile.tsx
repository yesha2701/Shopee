import React from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from './ProfileStyle';
import { useRoute } from '@react-navigation/native';
import { Todo } from '../redux/slice/UserSlice';

const Profile = () => {
  console.log('Profile-------------------------------');
  const route = useRoute();
  const { item } = route.params as { item: Todo };
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.detailView}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.title}>{item.returnPolicy}</Text>
      </View>
    </View>
  );
};

export default Profile;
