import { memo } from 'react';
import { ImageProps, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './CustomButtonStyle';

interface CustomButton {
  label?: string;
  source?: ImageProps;
  onPress: () => void;
}

export const CustomButton: React.FC<CustomButton> = memo(
  ({ label, onPress }) => {
    return (
      <View>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          {label && <Text style={styles.text}>{label}</Text>}
        </TouchableOpacity>
      </View>
    );
  },
);
