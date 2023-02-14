import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import SignIn from '@screens/SignIn';
import SignUp from '@screens/SignUp';

import AppRoutes from './app.routes';

type AuthRoutes = {
    app: { screen: keyof AppRoutes }
    signUp: undefined,
    signIn: undefined
}

export type AuthRoutesNavigatorProps = NativeStackNavigationProp<AuthRoutes>

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

const AuthRoutes = () => {

    return (
        <Navigator screenOptions = {{headerShown: false}} initialRouteName = 'signIn' >
            <Screen 
                name = 'app'
                component = {AppRoutes}
            />

            <Screen 
                name = 'signIn'
                component = {SignIn}
            />
            <Screen 
                name = 'signUp'
                component = {SignUp}
            />
        </Navigator>
    )
}

export default AuthRoutes;