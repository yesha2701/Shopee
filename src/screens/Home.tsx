/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect } from 'react';
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { strings } from '../utilities/strings';
import { styles } from './HomeStyle';
import { CustomArrowButton } from '../components/CustomArrowButton';
import { icons } from '../../assets/icons';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import { images } from '../../assets/images';
import { useSharedValue } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { useRef } from 'react';
import { fetchData } from '../redux/actions/itemsAction';
import { Todo } from '../redux/slice/itemsSlice';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigationType';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const carouselImages = [
    images.cosmetic01,
    images.cosmetic02,
    images.cosmetic03,
    images.cosmetic04,
  ];
  const ref = useRef<ICarouselInstance>(null);
  const { logout, username } = useAuth();
  const progress = useSharedValue<number>(0);
  const Data = useSelector((state: RootState) => state.itemSlice.items);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const onNavigate = () => {
    navigation.navigate('Details');
  };

  const Item = ({ item }: { item: Todo }) => {
    return (
      <View style={styles.listView}>
        <View style={styles.listItems}>
          <Image source={{ uri: item.image }} style={styles.listImg} />
          <Text style={styles.listTitle}>{item.title}</Text>
        </View>
        <View>
          <Text style={styles.listPrice}> ${item.price}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topView}>
          <Text style={styles.helloStyle}>
            {strings.greet}
            {username.split('@')[0]}!
          </Text>
          <TouchableOpacity onPress={logout}>
            <Text style={styles.logoutStyle}>{strings.logout}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.announcementView}>
          <View style={styles.loremView}>
            <Text style={styles.announcementText}>{strings.announcement}</Text>
            <Text style={styles.loremStyle}>{strings.lorem}</Text>
          </View>
          <CustomArrowButton source={icons.rightArrow} onPress={() => null} />
        </View>
        <View>
          <Carousel
            data={carouselImages}
            renderItem={({ item }) => {
              return (
                <View style={styles.carouselItem}>
                  <Image source={item} style={styles.carouselImg} />
                </View>
              );
            }}
            width={Platform.OS === 'ios' ? 400 : 490}
            height={180}
            autoPlay={true}
            pagingEnabled={true}
            scrollAnimationDuration={1000}
            ref={ref}
            onProgressChange={progress}
            autoPlayInterval={2000}
          />
          <Pagination.Basic
            progress={progress}
            data={carouselImages}
            dotStyle={styles.inactiveDot}
            containerStyle={styles.dotContainer}
            onPress={onPressPagination}
            activeDotStyle={styles.activeDot}
          />
        </View>
        <View style={styles.nextView}>
          <Text style={styles.nextTitle}>{strings.nextItem}</Text>
          <View style={styles.nextInnerView}>
            <Text style={styles.seeTitle}>{strings.seeAll}</Text>
            <CustomArrowButton
              source={icons.rightArrow}
              onPress={() => onNavigate()}
            />
          </View>
        </View>
        <View style={styles.itemsView}>
          <FlatList
            data={Data}
            renderItem={({ item }) => <Item item={item} />}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
