import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { MapPin } from 'lucide-react-native';

export default function Header() {
	const [searchInput, setSearchInput] = useState('');

	const { data } = useSelector((state: RootState) => state.user);

	return (
		<View style={[styles.header, { paddingTop: 0 }]}>
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
			<View style={styles.addressContainer}>
				<MapPin color={'#fff'} size={21} strokeWidth={1.4} />
				<Text style={styles.addressText}>{data?.address}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		gap: 15,
		width: '100%',
		height: 100,
		backgroundColor: '#007BFF',
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	input: {
    width: '100%',
    height: 40,
		backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    maxWidth: 500
  },
	addressContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		gap: 5,
	},
	addressText: {
		color: '#fff',
		fontSize: 15,
	}
});