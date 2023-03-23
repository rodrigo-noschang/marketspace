import { useCallback, useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { VStack, Text, Heading, Select, HStack, Icon, ScrollView } from "native-base";
import { SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

import AppHeader from "@components/AppHeader";
import AddProduct from "@components/AddProduct";

import { useUserAdds } from "@contexts/userAddsContext";
import { AddsRoutesNavigationProps } from "@routes/adds.routes";
import { DatabaseProductDTO } from "@dtos/ProductDTO";

const UserAdds = () => {
    const { userAdds, fetchUserAdds, putAddOnFocus } = useUserAdds();
    
    const [selectedFilterCategory, setSelectedFilterCategory] = useState('all');
    const [filteredAdds, setFilteredAdds] = useState(userAdds);

    const listedAdds = selectedFilterCategory === 'all' ? userAdds : filteredAdds;

    const navigator = useNavigation<AddsRoutesNavigationProps>();

    const filterCategories = ['all', 'new', 'used', 'active', 'inactive'];
    const filterCategoriesLabels = ['Todos', 'Novos', 'Usados', 'Ativados', 'Desativados'];

    const filterNewOrUsedAdds = (condition: string) => {
        if (!userAdds) return;
        const isItemNew = condition === 'new';

        const newItems = userAdds?.filter(add => add.is_new === isItemNew);
        setFilteredAdds(newItems);
    }

    const filterActiveOrInactiveAdds = (condition: string) => {
        if (!userAdds) return;
        const isAddActive = condition === 'active';

        const activatedAdds = userAdds?.filter(add => add.is_active === isAddActive);
        setFilteredAdds(activatedAdds);
    }

    const handleFilterAdds = (category: string) => {
        if (category === 'new' || category === 'used') filterNewOrUsedAdds(category);

        if (category === 'active' || category === 'inactive') filterActiveOrInactiveAdds(category);

        if (category === 'all') setFilteredAdds(userAdds);

        setSelectedFilterCategory(category);
    }

    const handleNewAddRoute = () => {
        navigator.navigate('newAdd');
    }
    
    const handleShowAdd = (add: DatabaseProductDTO) => {
        putAddOnFocus(add.id);

        navigator.navigate('existingAddOverview');
    }
    
    useFocusEffect(useCallback(() => {
        fetchUserAdds();

        return () => {
            setSelectedFilterCategory('all');
        }
    }, []))

    return (
        <VStack pt = {45} px = {6} flex = {1}>
            <AppHeader 
                title = 'Meus anúncios'
                action = {handleNewAddRoute}
                actionIcon = "plus"
            />

            <HStack alignItems = 'center' justifyContent = 'space-between' mt = {4} pb = {4}>
                <Text fontSize = 'sm' fontFamily= 'body' color = 'gray.300'>
                    {listedAdds ? listedAdds.length : 0} anúncio(s) 
                </Text>

                <Select
                    selectedValue = {selectedFilterCategory} 
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
                    onValueChange = {itemValue => handleFilterAdds(itemValue)}
                >
                    {
                        filterCategories.map((category, i) => (
                            <Select.Item label = {filterCategoriesLabels[i]} value = {category} key = {category}/>
                        ))
                    }
                </Select>
            </HStack>

            <ScrollView flex = {1} showsVerticalScrollIndicator = {false}>
                <HStack flexWrap = 'wrap' justifyContent = 'space-between' pb = {10}>
                    {listedAdds?.length !== 0 ? 
                        listedAdds?.map((add, index) => (
                            <AddProduct 
                                product = {add} 
                                key = {`${add.id}-${index}`}
                                onPress = {() => handleShowAdd(add)}
                            />
                        ))
                    :
                        <Heading fontSize = 'lg' fontFamily = 'heading' color = 'gray.300' mt = {10} fontStyle = 'italic'> 
                            Você ainda não possui anúncios... Pressione no +, no canto superior direito da tela, para criar anúncios e receber ofertas! 
                        </Heading>
                    }
                </HStack>
            </ScrollView>
        </VStack>
    )
}

export default UserAdds;