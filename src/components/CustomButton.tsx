import { memo } from 'react';
import {
  ImageProps,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { styles } from './CustomButtonStyle';

interface CustomButton {
  label?: string;
  source?: ImageProps;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  onPress: () => void;
}

export const CustomButton: React.FC<CustomButton> = memo(
  ({ label, onPress, buttonStyle, textStyle }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={onPress}
          style={[styles.button, buttonStyle]}
        >
          {label && <Text style={[styles.text, textStyle]}>{label}</Text>}
        </TouchableOpacity>
      </View>
    );
  },
);
