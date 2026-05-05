import { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './CustomCancelStyle';

interface CustomCancelButton {
  label?: string;
  onPress: () => void;
}
export const CustomCancelButton: React.FC<CustomCancelButton> = memo(
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
