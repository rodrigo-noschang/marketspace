import { Box } from "native-base";
import { NavigationContainer } from "@react-navigation/native"; 

import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";

import { useAuth } from "@contexts/authContext";

const Routes = () => {
    const { user } = useAuth();

    return (
        <Box flex = {1} bgColor = 'gray.600'>
            <NavigationContainer>

                {user.id ? <AuthRoutes /> : <AppRoutes />}
                
            </NavigationContainer>
        </Box>
    )

}

export default Routes;