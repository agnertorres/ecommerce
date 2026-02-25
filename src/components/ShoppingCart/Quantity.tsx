import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Trash2 } from "lucide-react-native";

import { addProductQuantity, decreaseProductQuantity } from "../../store/slices/shoppingCartSlice";

interface QuantityComponentProps {
  quantity: number;
  id: number;
}

export default function Quantity ({ quantity, id }: QuantityComponentProps) {
  const dispatch = useDispatch<AppDispatch>();

  const addQuantity = () => {
    dispatch(addProductQuantity(id));
  }

  const decreaseQuantity = () => {
    dispatch(decreaseProductQuantity(id));
  }

  return (
    <View style={styles.container}>
      <Text>Quantidade: </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={decreaseQuantity}>
          {
            quantity < 2
              ? <Trash2 size={16} strokeWidth={.8} />
              : <Text>-</Text>
          }
        </TouchableOpacity>
        <Text>{quantity}</Text>
        <TouchableOpacity style={styles.button} onPress={addQuantity}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  buttonContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 5,
    borderWidth: .7,
    borderColor: '#ccc',
    borderRadius: 15,
    paddingHorizontal: 2,
    paddingBottom: 1,
  },
  button: {
    justifyContent: 'center',
    alignItems:'center',
    width: 25,
    height: 25,
  }
})