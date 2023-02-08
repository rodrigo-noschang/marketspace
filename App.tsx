import Header from '@components/Header';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Karla_400Regular, Karla_700Bold } from '@expo-google-fonts/karla';

import { THEME } from './src/theme';
import Loading from '@components/Loading';

import Home from '@screens/Home';

export default function App() {
	const [fontsLoaded] = useFonts({Karla_400Regular, Karla_700Bold});

	return (
		<NativeBaseProvider theme = {THEME}>
			{ fontsLoaded ? 
				<Home /> : <Loading />
			}
		</NativeBaseProvider>
	);
}
