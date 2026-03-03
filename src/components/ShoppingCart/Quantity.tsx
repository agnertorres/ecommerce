import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Trash2 } from "lucide-react-native";

import { useStore } from "../../store/";
import { darkGray, gray, red } from "../ui/colors";

interface QuantityComponentProps {
  quantity: number;
  id: number;
  stock: number;
}

export default function Quantity ({ quantity, id, stock }: QuantityComponentProps) {
  const { addProductQuantity, decreaseProductQuantity } = useStore.shoppingCart();

  const addQuantity = () => {
    addProductQuantity(id);
  }

  const decreaseQuantity = () => {
    decreaseProductQuantity(id);
  }

  return (
    <View style={styles.container}>
      <Text>Quantidade: </Text>
      <View style={[styles.buttonContainer, { borderColor: quantity > stock ? red : '#ccc' }]}>
        <TouchableOpacity style={styles.button} onPress={decreaseQuantity}>
          {
            quantity < 2
              ? <Trash2 size={16} strokeWidth={.8} />
              : <Text>-</Text>
          }
        </TouchableOpacity>
        <Text style={{ color: quantity > stock ? red : darkGray }}>{quantity}</Text>
        <TouchableOpacity disabled={quantity >= stock} style={styles.button} onPress={addQuantity}>
          <Text style={{ color: quantity >= stock ? gray : darkGray }}>+</Text>
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