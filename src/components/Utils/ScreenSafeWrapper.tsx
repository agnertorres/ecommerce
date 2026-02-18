import { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenSafeWrapperProps {
  children: ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
}

export default function ScreenSafeWrapper({ children, style, backgroundColor }: ScreenSafeWrapperProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ 
      flex: 1, 
      paddingTop: insets.top, 
      backgroundColor: backgroundColor || '#fff',
      ...style
    }}>
      {children}
    </View>
  );
};