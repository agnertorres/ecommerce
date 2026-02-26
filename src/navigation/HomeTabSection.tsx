import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ScreenSafeWrapper from '../components/Utils/ScreenSafeWrapper';
import Header from '../components/Home/Header';
import HomeScreen from '../screens/Home';
import { blue } from '../components/ui/colors';

const Tab = createMaterialTopTabNavigator();

export default function HomeTabSection() {
	return (
		<ScreenSafeWrapper backgroundColor={blue}>
			<Header />
			<Tab.Navigator
				screenOptions={{
					lazy: true,
					tabBarScrollEnabled: true,
					tabBarActiveTintColor: blue,
					tabBarInactiveTintColor: '#888',
					tabBarIndicatorStyle: { backgroundColor: blue, height: 3 },
					tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold', textTransform: 'none' },
					tabBarStyle: { elevation: 0, shadowOpacity: 0, display: 'flex' }, // Remove a linha feia no Android
					tabBarItemStyle: { width: 'auto', paddingVertical: 0, paddingHorizontal: 5, }
				}}
			>
				<Tab.Screen
					name="Tudo"
					component={HomeScreen}
				/>
				<Tab.Screen 
					name="Eletrônicos"
					component={HomeScreen}
				/>
				<Tab.Screen
					name="Casa"
					component={HomeScreen}
				/>
				<Tab.Screen
					name="Esporte"
					component={HomeScreen}
				/>
				<Tab.Screen
					name="Música"
					component={HomeScreen}
				/>
				<Tab.Screen
					name="Moda"
					component={HomeScreen}
				/>
				<Tab.Screen
					name="Beleza"
					component={HomeScreen}
				/>
			</Tab.Navigator>
		</ScreenSafeWrapper>
	);
}