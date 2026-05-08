import { Image, ScrollView, Text, TextInput, View } from 'react-native';
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
import { useDispatch } from 'react-redux';
import { insertData, updateData } from '../redux/actions/userActions';
import { launchImageLibrary } from 'react-native-image-picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationType';
import { Todo } from '../redux/slice/UserSlice';

const Form = () => {
  console.log('Form----------------------------------------');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const onCancel = () => {
    navigation.goBack();
  };

  const onNavigate = () => {
    navigation.navigate('BottomNavigator', { screen: 'Details' });
  };

  const dispatch = useDispatch();

  const route = useRoute();
  const data = route.params as { isEdit: boolean; item: Todo };
  const editItem = data?.item;
  const isEdit = data?.isEdit;

  useEffect(() => {
    if (isEdit === true) {
      setTitle(editItem.title);
      setImage(editItem.image);
      setPrice(editItem.price);
      setCategory(editItem.category);
      setDescription(editItem.description);
      setReturnPolicy(editItem.returnPolicy);
    } else {
      onClearInput();
    }
  }, [isEdit, editItem]);
  const categoryOptions = [
    { label: 'beauty', value: 'beauty' },
    { label: 'fragrance', value: 'fragrance' },
    { label: 'furniture', value: 'furniture' },
    { label: 'groceries', value: 'groceries' },
  ];

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [returnPolicy, setReturnPolicy] = useState('');
  const [errors, setErrors] = useState({ field: '', message: '' });

  const titleRef = useRef<TextInput>(null);
  const priceRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);
  const policyRef = useRef<TextInput>(null);

  const onClearInput = () => {
    setTitle('');
    setImage('');
    setPrice('');
    setCategory('');
    setDescription('');
    setReturnPolicy('');
  };

  const ImagePicker = () => {
    let options = {
      storageOptions: {
        path: 'image',
      },
    };

    launchImageLibrary(options, response => {
      setImage(response.assets[0].uri);
      setErrors({ field: '', message: '' });
    });
  };

  const onHandleChange = (
    field: 'title' | 'price' | 'category' | 'description' | 'returnPolicy',
    value: string,
  ) => {
    if (field === 'title') setTitle(value);
    if (field === 'price') setPrice(value);
    if (field === 'category') setCategory(value);
    if (field === 'description') setDescription(value);
    if (field === 'returnPolicy') setReturnPolicy(value);
    if (errors.field === field) {
      setErrors({ field: '', message: '' });
    }
  };

  const onSubmit = () => {
    let formError = { field: '', message: '' };

    if (title.trim() === '') {
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

    isEdit
      ? dispatch(
          updateData({
            title,
            image,
            price,
            category,
            description,
            returnPolicy,
          }),
        )
      : dispatch(
          insertData({
            title,
            image,
            price,
            category,
            description,
            returnPolicy,
          }),
        );

    onClearInput();
    onNavigate();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Items</Text>
        <View style={styles.formView}>
          <View>
            <Text style={styles.text}>{strings.name}</Text>
            <CustomTextInput
              placeholder="Enter Your Title"
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
        <CustomButton label="Submit" onPress={() => onSubmit()} />
        <CustomCancelButton label="Cancel" onPress={() => onCancel()} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Form;
