import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../../store';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { MapPin, ChevronRight, ChevronLeft } from 'lucide-react-native';

interface HeaderProps {
	style: Object;
	showBackButton: boolean;
}

export default function Header({ style, showBackButton = false }: HeaderProps) {
	const navigation = useNavigation();
	const [searchInput, setSearchInput] = useState('');

	const { data } = useSelector((state: RootState) => state.user);

	const goBack = () => {
		navigation.goBack();
	}

	const changeAddress = () => {
		navigation.navigate('EditProfile', { field: 'address', value: data?.address });
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
			<TouchableOpacity style={styles.addressContainer} onPress={changeAddress}>
				<View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
					<MapPin color={'#fff'} size={21} strokeWidth={1.4} />
					<Text style={styles.addressText}>{data?.address}</Text>
				</View>
				<ChevronRight style={styles.chevronRight} color={'#fff'} size={21} strokeWidth={1.4} />
			</TouchableOpacity>
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
    height: 40,
		backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    maxWidth: 500
  },
	addressContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 15,
	},
	addressText: {
		color: '#fff',
		fontSize: 15,
	},
	chevronRight: {
		alignSelf: 'flex-end',
	},
});