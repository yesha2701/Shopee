import { ScrollView, Text, View } from 'react-native';
import { styles } from './FormStyle';
import { strings } from '../utilities/strings';
import CustomTextInput from '../components/CustomTextInput';
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { CustomButton } from '../components/CustomButton';
import { CustomCancelButton } from '../components/CustomCancelButton';
import { useNavigation } from '@react-navigation/native';

const Form = () => {
  const navigation = useNavigation();
  const onCancel = () => {
    navigation.goBack();
  };
  const categoryOptions = [
    { label: 'beauty', value: 'beauty' },
    { label: 'fragrance', value: 'fragrance' },
    { label: 'furniture', value: 'furniture' },
    { label: 'groceries', value: 'groceries' },
  ];

  const [categories, setCategories] = useState('');
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Items</Text>
        <View style={styles.formView}>
          <View>
            <Text style={styles.text}>{strings.id}</Text>
            <CustomTextInput placeholder="Enter Your Id" />
          </View>
          <View>
            <Text style={styles.text}>{strings.name}</Text>
            <CustomTextInput placeholder="Enter Your Title" />
          </View>
          <View>
            <Text style={styles.text}>{strings.price}</Text>
            <CustomTextInput placeholder="Enter Your Price" />
          </View>
          <View>
            <Text style={styles.text}>{strings.categories}</Text>
            <Dropdown
              data={categoryOptions}
              labelField="label"
              valueField="value"
              placeholder="Select Title"
              value={categories}
              // onConfirmSelectItem={() => amountRef.current?.focus()}
              onChange={item => {
                setCategories(item.value);
                // setErrors({ field: '', message: '' });
              }}
              style={styles.dropdown}
              // placeholderStyle={styles.placeholderStyle}
            />
          </View>
          <View>
            <Text style={styles.text}>{strings.description}</Text>
            <CustomTextInput placeholder="Enter your Description" />
          </View>
          <View>
            <Text style={styles.text}>{strings.returnPolicy}</Text>
            <CustomTextInput placeholder="Enter your Return Policy" />
          </View>
        </View>
        <CustomButton label="Submit" onPress={() => null} />
        <CustomCancelButton label="Cancel" onPress={() => onCancel()} />
      </ScrollView>
    </View>
  );
};

export default Form;
