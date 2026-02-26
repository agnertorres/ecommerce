import { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, ColorValue } from 'react-native';
import { blue, white } from './colors';

interface ButtonProps extends TouchableOpacityProps {
  backgroundColor?: ColorValue;
  textColor?: ColorValue;
  children: ReactNode;
  onPress?: () => void;
}

export default function Button ({
  backgroundColor = blue,
  textColor = white,
  children,
  onPress,
  style,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor }, style]}
      {...rest}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button:{
    width: '100%',
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 500,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});