import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { useFonts, Karla_400Regular, Karla_700Bold } from '@expo-google-fonts/karla';

import { THEME } from './src/theme';
import Loading from '@components/Loading';

import Routes from '@routes/index';

// import { AuthContextProvider } from '@contexts/authContext';
import Providers from '@contexts/index';

export default function App() {
	const [fontsLoaded] = useFonts({Karla_400Regular, Karla_700Bold});

	return (
		<NativeBaseProvider theme = {THEME}>

			{fontsLoaded ?
				<Providers>
					<GestureHandlerRootView style = {{flex: 1}}>
						<StatusBar backgroundColor = '#EDECEE' barStyle = 'dark-content'/>
						<Routes />
					</GestureHandlerRootView>
				</Providers>
			:
				<Loading />
			}
		</NativeBaseProvider>
	);
}
