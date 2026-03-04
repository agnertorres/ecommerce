import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Modal,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { XIcon } from 'lucide-react-native';
import { separator, white, gray, lightGray, lightBlack } from '../ui/colors';
import { Button } from '../ui/components';

interface QuantityModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void; 
  selectedQuantity: number;
  setSelectedQuantity: (quantity: number) => void;
  stock?: number;
}

export default function SelectQuantityModal({
  modalVisible,
  setModalVisible,
  selectedQuantity,
  setSelectedQuantity,
  stock = 1
}: QuantityModalProps) {
  const [showQuantityInput, setShowQuantityInput] = useState<boolean>(false);

  const quantity = [
    '1 unidade',
    '2 unidades',
    '3 unidades',
    '4 unidades',
    '5 unidades',
    '6 unidades',
    'Mais de 6 unidades',
  ];

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.closeButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);

              setTimeout(() => {
                setShowQuantityInput(false);
              }, 500);
            }}
          >
            <XIcon size={30} strokeWidth={1.7} color={white}/>
          </TouchableOpacity>
        </View>
        <View style={modalStyles.modalView}>
          <Text style={modalStyles.modalTitle}>Selecione a quantidade</Text>
          {
            showQuantityInput
              ? <QuantityInput
                  setSelectedQuantity={setSelectedQuantity}
                  stock={stock}
                  setModalVisible={setModalVisible}
                  setShowQuantityInput={setShowQuantityInput}
                />
              : <FlatList
                  data={quantity}
                  renderItem={({ item, index }) =>
                    <QuantityComponent
                      selectedQuantity={selectedQuantity}
                      setSelectedQuantity={setSelectedQuantity}
                      item={item}
                      index={index}
                      setModalVisible={setModalVisible}
                      modalVisible={modalVisible}
                      showQuantityInput={showQuantityInput}
                      setShowQuantityInput={setShowQuantityInput}
                    />
                  }
                  keyExtractor={item => item.toString()}
                  style={modalStyles.flatList}
                />
          }
        </View>
      </View>
    </Modal>
  )
}

interface QuantityComponent extends QuantityModalProps{
  item: string;
  index: number;
  showQuantityInput: boolean;
  setShowQuantityInput: (showQuantityInput: boolean) => void;
}

const QuantityComponent = ({
  selectedQuantity,
  setSelectedQuantity,
  setModalVisible,
  modalVisible,
  item,
  index,
  showQuantityInput,
  setShowQuantityInput,
}: QuantityComponent) => {

  const handleSelectQuantity = () => {
    if (index > 5) {
      setShowQuantityInput(!showQuantityInput);
      return;
    }

    setSelectedQuantity(index+1);
    setModalVisible(!modalVisible);
  }

  return (
    <TouchableOpacity
      onPress={handleSelectQuantity}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderBottomColor: separator,
        borderBottomWidth:.6,
        width: '100%',
        paddingVertical: 5,
        backgroundColor: selectedQuantity === index+1 ? gray : '',
    }}>
      <Text style={{
        fontSize: 16,
        textAlign: 'left',
        color: lightBlack,
      }}>
        {item}
      </Text>
    </TouchableOpacity>
  );
};

interface QuantityInputProps {
  stock: number;
  setSelectedQuantity: (selectedQuantity: number) => void;
  setModalVisible: (modalVisible: boolean) => void;
  setShowQuantityInput: (showQuantityInput: boolean) => void;
}

const QuantityInput = ({
  stock,
  setSelectedQuantity,
  setModalVisible,
  setShowQuantityInput
}: QuantityInputProps) => {
  const [quantity, setQuantity] = useState<string>('');

  const changeQuantity = () => {
    if (Number(quantity) > stock) {
      Alert.alert(
        '',
        'Informe uma quantidade disponível em estoque',
        [{ text: 'Ok' }],
        { cancelable: true }
      );

      return;
    }
    setSelectedQuantity(Number(quantity));
    setModalVisible(false);

    setTimeout(() => {
      setShowQuantityInput(false);
    }, 500)
  }

  return (
    <View style={inputStyles.container}>
      <View>
        <Text style={{ color: lightGray }}>{`${stock} disponível`}</Text>
        <TextInput
          value={quantity}
          onChangeText={setQuantity}
          style={inputStyles.input}
          placeholder={'Quantidade'}
          autoCapitalize="none"
          keyboardType={'numeric'}
          maxLength={50}
          autoFocus={true}
        />
      </View>
      <Button onPress={changeQuantity}>
        Aplicar
      </Button>
    </View>
  )
};

const inputStyles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: 10,
    gap: 15,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    maxWidth: 500
  }
});

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#4b4b4b8f',
  },
  modalView: {
    minHeight: 350,
    width: '100%',
    backgroundColor: white,
    borderRadius: 5,
    paddingVertical: 30,
    alignItems: 'center',
    shadowColor: lightBlack,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'left',
    fontSize: 16,
    color: lightBlack,
    width: '100%',
    paddingHorizontal: 10,
  },
  flatList: {
    width: '100%',
    borderTopColor: separator,
    borderTopWidth:.6,
  }
});