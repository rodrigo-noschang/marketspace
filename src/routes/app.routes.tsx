import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Icon, useTheme } from "native-base";
import { Octicons } from '@expo/vector-icons';

import Home from "@screens/Home";
import SignOut from "@screens/SignOut";
import UserAdds from "@screens/UserAdds";

type AppRoutes = {
    home: undefined,
    myAdds: undefined,
    signOut: undefined
}

export type AppRoutesNavigatorProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

const AppRoutes = () => {
    const { colors } = useTheme();

    return (
        <Navigator 
            screenOptions = {{ 
                headerShown: false, 
                tabBarShowLabel: false,
                tabBarInactiveTintColor: colors.gray[500],
                tabBarActiveTintColor: colors.gray[300]
            }} 
            initialRouteName = "home"
        >
            <Screen 
                name = 'home'
                component = {Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon 
                            as = {Octicons}
                            name = 'home'
                            size = {6}
                            color = {color}
                        />
                    )
                }}
            />

            <Screen 
                name = 'myAdds'
                component = {UserAdds}
                options = {{
                    tabBarIcon: ({ color }) => (
                        <Icon 
                            as = {Octicons}
                            name = 'tag'
                            size = {6}
                            color = {color}
                        />
                    )
                }}
            />

            <Screen 
                name = 'signOut'
                component = {SignOut}
                options={{
                    tabBarIcon: () => (
                        <Icon 
                            as = {Octicons}
                            name = 'sign-out'
                            size = {6}
                            color = 'red.100'
                        />
                    ),
                }}
            />

        </Navigator>
    )
}

export default AppRoutes;