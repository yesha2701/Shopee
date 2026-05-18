import { Alert, Image, ScrollView, Text, TextInput, View } from 'react-native';
import { styles } from './FormStyle';
import { strings } from '../utilities/strings';
import CustomTextInput from '../components/CustomTextInput';
import React, { useEffect, useRef, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { CustomButton } from '../components/CustomButton';
import { CustomCancelButton } from '../components/CustomCancelButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { icons } from '../../assets/icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { insertData, updateData } from '../redux/actions/itemsAction';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationType';
import { addItem, Todo, updateItem } from '../redux/slice/itemsSlice';
import { RootState, useAppDispatch } from '../redux/store';
import NetInfo from '@react-native-community/netinfo';
import { useSelector } from 'react-redux';
const Form = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const onCancel = () => {
    navigation.goBack();
  };

  const onNavigate = () => {
    navigation.navigate('BottomNavigator', { screen: 'Details' });
  };

  const dataList = useSelector(
    (state: RootState) => state.itemSlice.offlineData,
  );
  console.log('dataList :>> ', dataList);
  const dispatch = useAppDispatch();

  const route = useRoute();
  const data = route.params as { isEdit: boolean; item: Todo };
  const editItem = data?.item;
  const isEdit = data?.isEdit;

  useEffect(() => {
    if (isEdit === true) {
      setId(editItem.id);
      setTitle(editItem.title);
      setImage(editItem.image);
      setPrice(editItem.price);
      setCategory(editItem.category);
      setDescription(editItem.description);
      setReturnPolicy(editItem.returnPolicy);
    } else {
      onClearInput();
      idRef.current?.focus();
    }
  }, [isEdit, editItem]);
  const categoryOptions = [
    { label: 'beauty', value: 'beauty' },
    { label: 'fragrance', value: 'fragrance' },
    { label: 'furniture', value: 'furniture' },
    { label: 'groceries', value: 'groceries' },
  ];

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [returnPolicy, setReturnPolicy] = useState('');
  const [errors, setErrors] = useState({ field: '', message: '' });

  const idRef = useRef<TextInput>(null);
  const titleRef = useRef<TextInput>(null);
  const priceRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);
  const policyRef = useRef<TextInput>(null);

  const onClearInput = () => {
    setId('');
    setTitle('');
    setImage('');
    setPrice('');
    setCategory('');
    setDescription('');
    setReturnPolicy('');
  };

  const ImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, response => {
      let imageUri = response.assets?.[0]?.uri ?? '';
      setImage(imageUri);
      setErrors({ field: '', message: '' });
    });
  };

  const onHandleChange = (
    field:
      | 'id'
      | 'title'
      | 'price'
      | 'category'
      | 'description'
      | 'returnPolicy',
    value: string,
  ) => {
    if (field === 'id') setId(value.replace(/[^0-9]/g, ''));
    if (field === 'title') setTitle(value.replace(/[^A-Za-z\s]/g, ''));
    if (field === 'price') setPrice(value.replace(/[^0-9]/g, ''));
    if (field === 'category') setCategory(value);
    if (field === 'description') setDescription(value);
    if (field === 'returnPolicy') setReturnPolicy(value);
    if (errors.field === field) {
      setErrors({ field: '', message: '' });
    }
  };

  const onInsert = () => {
    Alert.alert('Confirmation', 'Are you sure you want to insert data', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => [
          await dispatch(
            insertData({
              id,
              title,
              image,
              price,
              category,
              description,
              returnPolicy,
            }),
          ),
          onNavigate(),
        ],
      },
    ]);
  };

  const onOfflineDispatch = () => {
    if (dataList.map(x => x.id).includes(id)) {
      Alert.alert('Id Already exist');
    } else {
      dispatch(
        addItem({
          id,
          title,
          image,
          price,
          category,
          description,
          returnPolicy,
        }),
      ),
        onNavigate();
    }
  };

  const onOfflineInsert = () => {
    Alert.alert('Confirmation', 'Are you sure you want to insert data', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          onOfflineDispatch();
        },
      },
    ]);
  };

  const onSubmit = async () => {
    let formError = { field: '', message: '' };

    if (id.trim() === '') {
      formError.field = 'id';
      formError.message = 'Id is Required';
      setErrors(formError);
      return;
    } else if (title.trim() === '') {
      formError.field = 'title';
      formError.message = 'Title is Required';
      setErrors(formError);
      return;
    } else if (image.trim() === '') {
      formError.field = 'image';
      formError.message = 'image is Required';
      setErrors(formError);
      return;
    } else if (price.trim() === '') {
      formError.field = 'price';
      formError.message = 'Price is Required';
      setErrors(formError);
      return;
    } else if (category.trim() === '') {
      formError.field = 'category';
      formError.message = 'category is Required';
      setErrors(formError);
      return;
    } else if (description.trim() === '') {
      formError.field = 'description';
      formError.message = 'Description is Required';
      setErrors(formError);
      return;
    } else if (returnPolicy.trim() === '') {
      formError.field = 'returnPolicy';
      formError.message = 'Return Policy is Required';
      setErrors(formError);
      return;
    }

    const network = await NetInfo.fetch();

    if (network.isConnected) {
      isEdit
        ? [
            await dispatch(
              updateData({
                id,
                data: {
                  title: title,
                  image: image,
                  price: price,
                  category: category,
                  description: description,
                  returnPolicy: returnPolicy,
                },
              }),
            ),
            onNavigate(),
          ]
        : onInsert();
    } else {
      isEdit
        ? [
            dispatch(
              updateItem({
                id,
                data: {
                  title: title,
                  image: image,
                  price: price,
                  category: category,
                  description: description,
                  returnPolicy: returnPolicy,
                },
              }),
            ),
            onNavigate(),
          ]
        : onOfflineInsert();
    }

    onClearInput();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Items</Text>
        <View style={styles.formView}>
          <View>
            <Text style={styles.text}>{strings.id}</Text>
            <CustomTextInput
              placeholder="Enter Your Id"
              editable={isEdit ? false : true}
              ref={idRef}
              returnKeyType="next"
              onSubmitEditing={() => titleRef.current?.focus()}
              value={id}
              onChangeText={val => onHandleChange('id', val)}
            />
            {errors.field === 'id' && (
              <Text style={styles.errorText}>{errors.message}</Text>
            )}
          </View>
          <View>
            <Text style={styles.text}>{strings.name}</Text>
            <CustomTextInput
              placeholder="Enter Your Title"
              autoCapitalize="words"
              ref={titleRef}
              returnKeyType="next"
              onSubmitEditing={() => priceRef.current?.focus()}
              value={title}
              onChangeText={val => onHandleChange('title', val)}
            />
            {errors.field === 'title' && (
              <Text style={styles.errorText}>{errors.message}</Text>
            )}
          </View>
          <View>
            <Text style={styles.text}>{strings.image}</Text>
            <View style={styles.imageView}>
              {image ? (
                <Image source={{ uri: image }} style={styles.uriImage} />
              ) : (
                <Image source={icons.image} />
              )}
            </View>
            <CustomButton
              label="Upload"
              onPress={() => ImagePicker()}
              buttonStyle={styles.buttonStyle}
              textStyle={styles.textStyle}
            />
            {errors.field === 'image' && (
              <Text style={styles.errorText}>{errors.message}</Text>
            )}
          </View>
          <View>
            <Text style={styles.text}>{strings.price}</Text>
            <CustomTextInput
              placeholder="Enter Your Price"
              keyboardType="number-pad"
              ref={priceRef}
              value={price}
              onChangeText={val => onHandleChange('price', val)}
            />
            {errors.field === 'price' && (
              <Text style={styles.errorText}>{errors.message}</Text>
            )}
          </View>
          <View>
            <Text style={styles.text}>{strings.categories}</Text>
            <Dropdown
              data={categoryOptions}
              labelField="label"
              valueField="value"
              placeholder="Select Category"
              value={category}
              onConfirmSelectItem={() => descriptionRef.current?.focus()}
              onChange={item => {
                setCategory(item.value);
                setErrors({ field: '', message: '' });
              }}
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
            />
            {errors.field === 'category' && (
              <Text style={styles.errorText}>{errors.message}</Text>
            )}
          </View>
          <View>
            <Text style={styles.text}>{strings.description}</Text>
            <CustomTextInput
              placeholder="Enter your Description"
              ref={descriptionRef}
              returnKeyType="next"
              onSubmitEditing={() => policyRef.current?.focus()}
              value={description}
              onChangeText={val => onHandleChange('description', val)}
            />
            {errors.field === 'description' && (
              <Text style={styles.errorText}>{errors.message}</Text>
            )}
          </View>
          <View>
            <Text style={styles.text}>{strings.returnPolicy}</Text>
            <CustomTextInput
              placeholder="Enter your Return Policy"
              ref={policyRef}
              returnKeyType="send"
              onSubmitEditing={() => onSubmit()}
              value={returnPolicy}
              onChangeText={val => onHandleChange('returnPolicy', val)}
            />
            {errors.field === 'returnPolicy' && (
              <Text style={styles.errorText}>{errors.message}</Text>
            )}
          </View>
        </View>
        <CustomButton
          label={isEdit ? 'Update' : 'Submit'}
          onPress={() => onSubmit()}
        />
        <CustomCancelButton label="Cancel" onPress={() => onCancel()} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Form;
