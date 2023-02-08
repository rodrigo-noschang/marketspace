import { Box } from "native-base";
import { NavigationContainer } from "@react-navigation/native"; 

import AuthRoutes from "./auth.routes";

const Routes = () => {
    return (
        <Box flex = {1} bgColor = 'gray.600'>
            <NavigationContainer>
                <AuthRoutes />
            </NavigationContainer>
        </Box>
    )

}

export default Routes;