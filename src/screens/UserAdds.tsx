import { VStack, Text, FlatList } from "native-base";

import AddProduct from "@components/AddProduct";

import { useUserAdds } from "@contexts/userAddsContext";

const UserAdds = () => {
    const { userAdds, fetchAndStoreUserAdds } = useUserAdds();

    console.log('On UserAdds -> ', userAdds);

    // useEffect(() => {
    //     removeAdds();

    // }, [])

    return (
        <VStack pt = {45} px = {6}>
            {/* TODO: IMPLEMENT THE HEADER COMPONENT THAT MIGHT HAVE A RETURN FUNCIONALITY */}

            <FlatList 
                data = {userAdds}
                keyExtractor = {add => add.id}
                renderItem = {({ item }) => (
                    <AddProduct product = {item}/>
                )}
            />
        </VStack>
    )
}

export default UserAdds;