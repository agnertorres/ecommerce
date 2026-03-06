import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CircleX, X} from "lucide-react-native";
import {lightRed, darkGray } from "../colors";

interface ErrorProps {
  message: string;
  onClose: () => void;
}

export default function Error({ message, onClose }: ErrorProps) {
  return (
    <View style={styles.container}>
      <View style={{ flex:1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <CircleX size={25} strokeWidth={1.5} color={lightRed}/>
        <Text style={styles.text}>{message}</Text>
      </View>
      <TouchableOpacity onPress={onClose}>
        <X size={26} strokeWidth={1.5} color={lightRed} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    maxWidth: 500,
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ff374b',
    backgroundColor: '#fef2f2',
    borderRadius: 5,
    shadowColor: darkGray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
  text: {
    color: lightRed,
    fontSize: 14,
    fontWeight: 500,
    maxWidth: 300,
  }
});