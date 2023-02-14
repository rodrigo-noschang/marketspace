import { useEffect } from "react";
import Loading from "@components/Loading";

import { useAuth } from "@contexts/authContext";
import { UserDTO } from "@dtos/UserDTO";
// import { useNavigation } from '@react-navigation/native'

// import { AuthRoutesNavigatorProps } from "@routes/auth.routes";

const SignOut = () => {
    // const navigator = useNavigation<AuthRoutesNavigatorProps>();
    const { signOutAndClearStorage } = useAuth();

    useEffect(() => {
        signOutAndClearStorage();
    }, [])

    return (
        <Loading />
    )
}

export default SignOut;