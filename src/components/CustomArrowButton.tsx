import { memo } from 'react';
import { Image, ImageProps, TouchableOpacity, View } from 'react-native';
import { styles } from './CustomArrowStyle';

interface CustomArrowButton {
  source: ImageProps;
  onPress: () => void;
}

export const CustomArrowButton: React.FC<CustomArrowButton> = memo(
  ({ source, onPress }) => {
    return (
      <View>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Image source={source} />
        </TouchableOpacity>
      </View>
    );
  },
);
