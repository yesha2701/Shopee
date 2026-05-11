/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './DetailsStyle';
import { strings } from '../utilities/strings';
import CustomTextInput from '../components/CustomTextInput';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { images } from '../../assets/images';
import { Todo } from '../redux/slice/UserSlice';
import { deleteData, fetchData } from '../redux/actions/userActions';
import { icons } from '../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../types/navigationType';
import { CustomArrowButton } from '../components/CustomArrowButton';

const Details = () => {
  const categories = [
    images.all,
    images.beauty,
    images.fragrance,
    images.furniture,
    images.groceries,
  ];
  const [searchQuery, setSearchQuery] = useState('');

  const Data = useSelector((state: RootState) => state.items);
  const dispatch = useAppDispatch();

  const navigation =
    useNavigation<BottomTabNavigationProp<RootStackParamList>>();

  const onNavigate = (item: Todo) => {
    navigation.navigate('Profile', { item });
  };

  const onInsert = () => {
    navigation.navigate('Form');
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const onUpdate = (item: Todo) => {
    navigation.navigate('Form', { item, isEdit: true });
  };

  const onDelete = (item: Todo) => {
    return Alert.alert(
      'Confirmation Alert',
      'Are you sure you want to delete this data?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => dispatch(deleteData(item.id)) },
      ],
    );
  };

  const filteredList = Data?.filter(items => {
    const onSearch = items?.title
      ?.toLowerCase()
      ?.includes(searchQuery.toLowerCase());
    return onSearch;
  });
  const Items = ({ item }: { item: Todo }) => {
    return (
      <View style={styles.listView}>
        <TouchableOpacity
          style={styles.listImgView}
          onPress={() => onNavigate(item)}
        >
          <View style={styles.iconView}>
            <TouchableOpacity onPress={() => onUpdate(item)}>
              <Image source={icons.edit} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(item)}>
              <Image source={icons.delete} />
            </TouchableOpacity>
          </View>

          <Image source={{ uri: item.image }} style={styles.listImg} />
        </TouchableOpacity>
        <Text style={styles.listText}>{item.title}</Text>
        <Text style={styles.listPrice}>${item.price}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView>
          <View style={styles.topView}>
            <Text style={styles.topTitle}>{strings.title}</Text>
            <CustomTextInput
              placeholder="Search"
              textInputStyle={styles.topSearch}
              onChangeText={text => setSearchQuery(text)}
            />
          </View>
          <View style={styles.categoryView}>
            <Text style={styles.categoryText}>{strings.categories}</Text>
            <View style={styles.categoryImgView}>
              <FlatList
                data={categories}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      style={styles.categoryBtn}
                      onPress={() => null}
                    >
                      <Image source={item} style={styles.categoriesImg} />
                    </TouchableOpacity>
                  );
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
          <View style={styles.itemView}>
            <View style={styles.insertVew}>
              <Text style={styles.categoryText}>{strings.justForYou}</Text>
              <CustomArrowButton
                source={icons.add}
                onPress={() => onInsert()}
              />
            </View>
            <FlatList
              data={filteredList}
              renderItem={({ item }) => <Items item={item} />}
              numColumns={2}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default Details;
