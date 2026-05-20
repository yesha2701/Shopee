import {
  Image,
  ImageProps,
  KeyboardTypeOptions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { icons } from '../../assets/icons';
import { styles } from './CustomTextInputStyles';

interface CustomTextInputProps {
  placeholder: string;
  label?: string;
  source?: ImageProps;
  secureTextEntry?: boolean;
  rightIcon?: ImageProps;
  placeholderTextColor?: string;
  textInputStyle?: ViewStyle;
  onSubmitEditing?: () => void;
  returnKeyType?: 'done' | 'go' | 'next' | 'send';
  onChangeText?: (val: string) => void;
  value?: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'words';
  editable?: boolean;
}

interface CustomTextInputRef {
  focus: () => void;
  blur: () => void;
  clear: () => void;
}

const CustomTextInput = forwardRef<CustomTextInputRef, CustomTextInputProps>(
  (
    {
      placeholder,
      label,
      source,
      rightIcon,
      secureTextEntry,
      placeholderTextColor,
      textInputStyle,
      onSubmitEditing,
      returnKeyType,
      onChangeText,
      value,
      editable,
      keyboardType,
      autoCapitalize,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const inputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      clear: () => inputRef.current?.clear(),
    }));

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const onTogglePassword = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    return (
      <View
        style={[
          styles.container,
          textInputStyle,
          isFocused ? styles.focusStyle : styles.blurStyle,
        ]}
      >
        {label && <Text style={styles.label}>{label}</Text>}
        <View>{source && <Image source={source} />}</View>
        <View style={styles.textInputView}>
          <TextInput
            placeholder={placeholder}
            style={styles.textInput}
            placeholderTextColor={placeholderTextColor}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onSubmitEditing={onSubmitEditing}
            returnKeyType={returnKeyType}
            onChangeText={onChangeText}
            value={value}
            editable={editable}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            {...props}
          />
          {(secureTextEntry || rightIcon) && (
            <TouchableOpacity onPress={onTogglePassword}>
              <Image
                source={isPasswordVisible ? icons.eye : icons.eye_hidden}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  },
);

export default memo(CustomTextInput);
