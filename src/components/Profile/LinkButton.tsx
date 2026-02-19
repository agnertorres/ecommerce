import { ReactNode } from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface LinkButtonProps {
	data?: string;
	description: string;
	iconComponent: ReactNode;
	onPress: () => void;
}

export default function LinkButton({ data, description, iconComponent, onPress }: LinkButtonProps) {
	return (
		<TouchableOpacity onPress={onPress} style={styles.linkButton}>
			<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
				<View style={{ marginRight: 10 }}>
					{iconComponent}
				</View>
				<View>
					<Text style={styles.linkButtonText}>{data}</Text>
					<Text style={styles.linkButtonDescription}>{description}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	linkButton: {
		paddingVertical: 10,
		paddingHorizontal: 15,
	},
	linkButtonText: {
		color: '#333',
		fontSize: 16,
	},
	linkButtonDescription: {
		color: '#767676',
		fontSize: 14,
	},
});