/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
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
import { deleteItem, Todo } from '../redux/slice/itemsSlice';
import {
  deleteData,
  fetchData,
  syncOfflineData,
} from '../redux/actions/itemsAction';

import { icons } from '../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../types/navigationType';
import { CustomArrowButton } from '../components/CustomArrowButton';
import NetInfo from '@react-native-community/netinfo';

const Details = () => {
  const categories = [
    { id: 1, name: 'all', image: images.all },
    { id: 2, name: 'beauty', image: images.beauty },
    { id: 3, name: 'fragrance', image: images.fragrance },
    { id: 4, name: 'furniture', image: images.furniture },
    { id: 5, name: 'groceries', image: images.groceries },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const dispatch = useAppDispatch();

  const Data = useSelector((state: RootState) => state.itemSlice.items);

  const offlineData = useSelector(
    (state: RootState) => state.itemSlice.offlineData,
  );
  const isSyncing = useSelector(
    (state: RootState) => state.itemSlice.isSyncing,
  );

  const navigation =
    useNavigation<BottomTabNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const trySyncOrFetch = async (isConnected: boolean | null) => {
      if (!isConnected) {
        return;
      }
      if (offlineData?.length > 0 && !isSyncing) {
        dispatch(syncOfflineData());
      } else if (offlineData?.length === 0) {
        dispatch(fetchData());
      }
    };

    NetInfo.fetch().then(net => trySyncOrFetch(net.isConnected));

    const unsubscribe = NetInfo.addEventListener(net =>
      trySyncOrFetch(net.isConnected),
    );

    return () => unsubscribe();
  }, [dispatch, offlineData?.length, isSyncing]);

  const onNavigate = (item: Todo) => {
    navigation.navigate('Profile', { item });
  };

  const onInsert = () => {
    navigation.navigate('Form');
  };

  const onUpdate = (item: Todo) => {
    navigation.navigate('Form', {
      item,
      isEdit: true,
    });
  };

  const onDelete = (item: Todo) => {
    return Alert.alert(
      'Confirmation Alert',
      'Are you sure you want to delete this data?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },

        {
          text: 'OK',

          onPress: async () => {
            const network = await NetInfo.fetch();

            if (network.isConnected) {
              dispatch(deleteData(item.id));
            } else {
              dispatch(deleteItem(item.id));
            }
          },
        },
      ],
    );
  };

  const filteredList = Data?.filter(item => {
    const onSearch = item.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    const onFilter =
      selectedCategory === 'all' || item.category === selectedCategory;

    return onSearch && onFilter;
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

        {item.isOffline && <Text style={styles.errorText}>Pending Sync</Text>}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboard}
      >
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
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.categoryBtn}
                  onPress={() => setSelectedCategory(item.name)}
                >
                  <View style={styles.imgView}>
                    <Image source={item.image} style={styles.categoriesImg} />
                  </View>

                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>

        <View style={styles.itemView}>
          <View style={styles.insertVew}>
            <Text style={styles.categoryText}>{strings.justForYou}</Text>

            <CustomArrowButton source={icons.add} onPress={() => onInsert()} />
          </View>

          <FlatList
            data={filteredList}
            renderItem={({ item }) => <Items item={item} />}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              Platform.OS === 'ios' ? null : styles.flatListStyle
            }
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Details;
