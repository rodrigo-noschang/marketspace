import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import AppRoutes from './app.routes';
import NewAdd from '@screens/NewAdd';
import EditAdd from '@screens/EditAdd';
import NewAddPreview from '@screens/NewAddPreview';
import ListingAddOverview from '@screens/ListingAddOverview';
import UsersExistingAddOverview from '@screens/UsersExistingAddOverview';

type AddsRoutes = {
    appHome: undefined,
    newAdd: undefined,
    editAdd: undefined
    newAddPreview: undefined,
    listingAddOverview: {
        addId: string
    },
    usersExistingAddOverview: undefined,
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
                name = 'usersExistingAddOverview'
                component = {UsersExistingAddOverview}
            />

            <Screen 
                name = 'editAdd'
                component = {EditAdd}
            />

            <Screen 
                name = 'listingAddOverview'
                component = {ListingAddOverview}
            />

        </Navigator>
    )

}

export default AddsRoutes;