/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useRef } from 'react';
import { fetchData } from '../redux/actions/userActions';
import { Todo } from '../redux/slice/UserSlice';

const Home = () => {
  const carouselImages = [
    images.cosmetic01,
    images.cosmetic02,
    images.cosmetic03,
    images.cosmetic04,
  ];
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const Data = useSelector((state: RootState) => state.items);
  console.log('Data--------------------------- :>> ', Data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const Item = ({ item }: { item: Todo }) => {
    return (
      <View style={styles.listView}>
        <View style={styles.listImgView}>
          <Image source={{ uri: item.thumbnail }} style={styles.listImg} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
          <CustomArrowButton source={icons.rightArrow} onPress={() => null} />
        </View>
        <View>
          <Carousel
            data={carouselImages}
            renderItem={({ item }) => {
              return (
                <View style={styles.carouselItem}>
                  <Image source={item} style={styles.carouselImg} />;
                </View>
              );
            }}
            width={400}
            height={190}
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
            <CustomArrowButton source={icons.rightArrow} onPress={() => null} />
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
    </View>
  );
};

export default Home;
