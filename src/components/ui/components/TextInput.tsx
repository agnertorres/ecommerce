import { TextInput as Input, StyleSheet } from "react-native";

export default function TextInput(props) {
  return (
    <Input style={[styles.input, props.style]} {...props} />
  )
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    maxWidth: 500,
  }
});