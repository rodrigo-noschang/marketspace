import { ReactNode } from "react";
import { AuthContextProvider } from "./authContext";
import { UserAddsContexProvider } from "./userAddsContext";
import { NewAddContextProvider } from "./newAddContext";

type ProvidersProps = {
    children: ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
    return (
        <AuthContextProvider>
            <UserAddsContexProvider>
                <NewAddContextProvider>
                    { children }
                </NewAddContextProvider>
            </UserAddsContexProvider>
        </AuthContextProvider>
    )

}

export default Providers;