import { VStack, Text, Heading, FlatList, HStack } from "native-base";

import AddProduct from "@components/AddProduct";

import { useUserAdds } from "@contexts/userAddsContext";
import { useEffect, useState } from "react";
import { ProductAddDTO } from "@dtos/AddsDTO";

const UserAdds = () => {
    const { userAdds, fetchAndStoreUserAdds } = useUserAdds();

    return (
        <VStack pt = {45} px = {6} flex = {1}>
            {/* TODO: IMPLEMENT THE HEADER COMPONENT THAT MIGHT HAVE A RETURN FUNCIONALITY */}

            <HStack flexWrap = 'wrap' justifyContent = 'space-between'>
                {userAdds ? 
                    userAdds.map((add, index) => (
                        <AddProduct product = {add} key = {`${add.id}-${index}`}/>
                    ))
                :
                    <Heading> Você ainda não possui anúncios </Heading>
                }
            </HStack>
        </VStack>
    )
}

export default UserAdds;