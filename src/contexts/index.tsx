import { ReactNode } from "react";
import { AuthContextProvider } from "./authContext";
import { UserAddsContexProvider } from "./userAddsContext";

type ProvidersProps = {
    children: ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
    return (
        <AuthContextProvider>
            <UserAddsContexProvider>
                { children }
            </UserAddsContexProvider>
        </AuthContextProvider>
    )

}

export default Providers;