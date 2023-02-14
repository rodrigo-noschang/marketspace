import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import Home from "@screens/Home";

type AppRoutes = {
    home: undefined,
    myAdds: undefined,
    logout: undefined
}

type AppRoutesNavigatorProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

const AppRoutes = () => {

    return (
        <Navigator screenOptions = {{ headerShown: false }}>
            <Screen 
                name = 'home'
                component = {Home}
            />

        </Navigator>
    )
}

export default AppRoutes;