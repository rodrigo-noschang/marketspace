import { Box } from "native-base";
import { NavigationContainer } from "@react-navigation/native"; 

import AuthRoutes from "./auth.routes";
import AddsRoutes from "./adds.routes";

import { useAuth } from "@contexts/authContext";

import Loading from "@components/Loading";

const Routes = () => {
    const { isTokenValid, loadingData } = useAuth();

    if (loadingData) {
        return <Loading />
    }

    return (
        <Box flex = {1} bgColor = 'gray.600'>
            <NavigationContainer>

                { isTokenValid ? <AddsRoutes /> : <AuthRoutes /> }
                
            </NavigationContainer>
        </Box>
    )

}

export default Routes;