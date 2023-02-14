import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import Home from "@screens/Home";
import SignIn from "@screens/SignIn";
import SignOut from "@screens/SignOut";

import AuthRoutes from "./auth.routes";

type AppRoutes = {
    home: undefined,
    myAdds: undefined,
    signOut: undefined
}

export type AppRoutesNavigatorProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

const AppRoutes = () => {

    return (
        <Navigator screenOptions = {{ headerShown: false }} initialRouteName = "home">
            <Screen 
                name = 'home'
                component = {Home}
            />

            <Screen 
                name = 'myAdds'
                component = {Home}
            />

            <Screen 
                name = 'signOut'
                component = {SignOut}
            />

        </Navigator>
    )
}

export default AppRoutes;