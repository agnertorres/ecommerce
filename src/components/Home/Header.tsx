import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

import Address from '../Profile/Address';

interface HeaderProps {
	style: Object;
	showBackButton: boolean;
}

export default function Header({ style, showBackButton = false }: HeaderProps) {
	const navigation = useNavigation();
	const [searchInput, setSearchInput] = useState('');

	const goBack = () => {
		navigation.goBack();
	}

	return (
		<View style={[styles.header, { paddingTop: 0 }, style]}>
			<View style={[styles.inputContainer, { paddingLeft: showBackButton ? 0 : 15 }]}>
				{showBackButton && <BackButton onPress={goBack}/>}
				<TextInput
					value={searchInput}
					onChangeText={setSearchInput}
					style={styles.input}
					placeholder={'Buscar na loja...'}
					enterKeyHint="search"
					autoCapitalize="none"
					maxLength={50}
					autoCorrect={false}
					onSubmitEditing={() => console.log('aaaaaa')}
				/>
			</View>
			<Address />
		</View>
	)
}

interface BackButtonProps {
	onPress: () => void;
}

const BackButton = ({ onPress }: BackButtonProps) => (
	<TouchableOpacity onPress={onPress}>
		<ChevronLeft color={'#fff'} size={40} strokeWidth={1.4} />
	</TouchableOpacity>
)

const styles = StyleSheet.create({
	header: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 15,
		width: '100%',
		height: 100,
		backgroundColor: '#007BFF',
		paddingVertical: 10,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		gap: 5,
		paddingHorizontal: 15,
	},
	input: {
    flexGrow: 1,
    height: 32,
		backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    maxWidth: 500
  },
});