import { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { darkGray } from '../colors';

interface CardProps {
	style?: Object;
	children: ReactNode;
}

export default function Card({ style, children }: CardProps) {
	return (
		<View style={[cardStyle.card, style]}>
			{children}
		</View>
	)
}

const cardStyle = StyleSheet.create({
	card: {
		padding: 15,
		backgroundColor: '#fff',
		borderRadius: 2,
		shadowColor: darkGray,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3,
		elevation: 5,
		width: '100%'
	}
});