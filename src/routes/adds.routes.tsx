import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import AppRoutes from './app.routes';
import NewAdd from '@screens/NewAdd';
import NewAddPreview from '@screens/NewAddPreview';
import ExistingAddOverview from '@screens/ExistingAddOverview';

type AddsRoutes = {
    appHome: undefined,
    newAdd: undefined,
    newAddPreview: undefined,
    existingAddOverview: undefined
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

            <Screen 
                name = 'newAddPreview'
                component = {NewAddPreview}
            />

            <Screen 
                name = 'existingAddOverview'
                component = {ExistingAddOverview}
            />

        </Navigator>
    )

}

export default AddsRoutes;