import { useEffect, useState } from "react";
import { VStack, Text, Heading, Select, HStack, Icon } from "native-base";
import { SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

import AddProduct from "@components/AddProduct";
import AppHeader from "@components/AppHeader";

import { useUserAdds } from "@contexts/userAddsContext";
import { AddsRoutesNavigationProps } from "@routes/adds.routes";

const UserAdds = () => {
    const [selectedAddsFilter, setSelectedAddsFilter] = useState('all');
    const { userAdds } = useUserAdds();
    const [shownAdds, setShownAdds] = useState(userAdds);

    const navigator = useNavigation<AddsRoutesNavigationProps>();

    const filterUserAdds = () => {
        if (selectedAddsFilter === 'all') {
            setShownAdds(userAdds);
            return
        }

        const selectedAdd = userAdds?.filter(add => add.id === selectedAddsFilter);
        if (selectedAdd) {
            setShownAdds(selectedAdd);
        }
    }

    const handleNewAddRoute = () => {
        navigator.navigate('newAdd');
    }
    
    useEffect(() => {
        filterUserAdds();
    }, [selectedAddsFilter])

    return (
        <VStack pt = {45} px = {6} flex = {1}>
            <AppHeader 
                // returnable
                title = 'Meus anúncios'
                action = {handleNewAddRoute}
                actionIcon = "plus"
            />

            <HStack alignItems = 'center' justifyContent = 'space-between' mt = {4}>
                <Text fontSize = 'sm' fontFamily= 'body' color = 'gray.300'>
                    {userAdds ? userAdds.length : 0} anúncio(s) 
                </Text>

                <Select
                    selectedValue = {selectedAddsFilter} 
                    minW = {100} 
                    accessibilityLabel = 'Selecione um anúncio'
                    placeholder = 'Todos'
                    px = {2}
                    size = {3}
                    h = {8}
                    dropdownIcon = {
                        <Icon 
                            as = {SimpleLineIcons}
                            name = 'arrow-down'
                            size = {3}
                            mr = {1}
                        />
                    }
                    onValueChange = {itemValue => setSelectedAddsFilter(itemValue)}
                >
                    <Select.Item 
                        label = 'Todos' value = 'all'
                    />
                    {
                        userAdds?.map(add => (
                            <Select.Item label = {add.name} value = {add.id} key = {add.id}/>
                        ))
                    }
                </Select>
            </HStack>

            <HStack flexWrap = 'wrap' justifyContent = 'space-between'>
                {shownAdds ? 
                    shownAdds.map((add, index) => (
                        <AddProduct product = {add} key = {`${add.id}-${index}`}/>
                    ))
                :
                    <Heading fontSize = 'lg' fontFamily = 'heading' color = 'gray.300'> Você ainda não possui anúncios </Heading>
                }
            </HStack>
        </VStack>
    )
}

export default UserAdds;