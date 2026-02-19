import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';

import { signOut } from '../../store/slices/authSlice';
import { showModal } from '../../store/slices/profileModalSlice';

import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';

export default function ModalComponent() {
	const dispatch = useDispatch<AppDispatch>();
	const { visible } = useSelector((state: RootState) => state.profileModal);

	const handleSignout = () => {
    dispatch(signOut());
		dispatch(showModal(false));
  }

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={visible}
		>
			<View style={modalStyles.centeredView}>
				<View style={modalStyles.modalView}>
					<Text style={modalStyles.modalText}>Gostaria de sair da conta?</Text>
					<TouchableOpacity
						style={[modalStyles.button, modalStyles.buttonSignout]}
						onPress={handleSignout}>
						<Text style={modalStyles.textStyle}>Sair da conta</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[modalStyles.button, modalStyles.buttonClose]}
						onPress={() => dispatch(showModal(false))}>
						<Text style={modalStyles.textStyle}>Cancelar</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4b4b4b8f',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonSignout: {
    backgroundColor: '#ff0066',
  },
  buttonClose: {
    marginTop: 15,
    backgroundColor: '#a1a1a1',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});