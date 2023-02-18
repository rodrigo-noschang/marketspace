import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import AppRoutes from './app.routes';
import NewAdd from '@screens/NewAdd';

type AddsRoutes = {
    appHome: undefined,
    newAdd: undefined
}

export type AddsRoutesNavigationProps = NativeStackNavigationProp<AddsRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AddsRoutes>();

const AddsRoutes = () => {
    return (
        <Navigator screenOptions={{
            headerShown: false
        }}>
            <Screen 
                name = 'appHome'
                component = {AppRoutes}
            />

            <Screen 
                name = 'newAdd'
                component = {NewAdd}
            />
        </Navigator>
    )

}

export default AddsRoutes;