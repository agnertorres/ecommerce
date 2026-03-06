import { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, ColorValue, ActivityIndicator } from 'react-native';
import { blue, white } from '../colors';

interface ButtonProps extends TouchableOpacityProps {
  backgroundColor?: ColorValue;
  textColor?: ColorValue;
  loading?: boolean;
  children: ReactNode;
  onPress?: () => void;
}

export default function Button ({
  backgroundColor = blue,
  textColor = white,
  loading = false,
  children,
  onPress,
  style,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={[styles.button, { backgroundColor }, style]}
      {...rest}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>
        { loading ? <ActivityIndicator size="small" color={white} /> : children }
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