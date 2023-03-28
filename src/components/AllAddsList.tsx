import { useEffect, useState } from "react";
import { Modal, Text, VStack, ScrollView, Input, Icon, HStack, Button, useToast, Pressable, Heading } from "native-base";
import { Ionicons } from '@expo/vector-icons';

import Loading from "./Loading";
import AddProduct from "./AddProduct";
import AddsFilterForm from "./AddsFilterForm";

import api from "@services/api";
import { AppError } from "@utils/AppError";
import { PaymentOptions } from "@dtos/AddsDTO";
import { DatabaseProductDTO } from "@dtos/ProductDTO";

type FilterParametersTypes = {
    is_new: boolean | undefined,
    accept_trade: boolean | undefined,
    payment_methods: PaymentOptions[]
}

const AllAddsList = () => {
    const [isLoadingAdds, setIsLoadingAdds] = useState(true);
    const [allAddsList, setAllAddsList] = useState<DatabaseProductDTO[]>([]);
    const [isLoadingFilteredAdds, setIsLoadingFilteredAdds] = useState(false);
    const [filteredList, setFilteredList] = useState<DatabaseProductDTO[] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toast = useToast();

    const fetchFilteredAdds = async (filterParameters: FilterParametersTypes) => {
        setIsLoadingFilteredAdds(true);
        const { is_new, accept_trade, payment_methods } = filterParameters;

        const queryParam_is_new = `is_new=${is_new}`;
        const queryParam_accept_trade = `accept_trade=${accept_trade}`;
        const queryParam_payment_methods = payment_methods.map(method => `payment_method=${method}`).join('&');

        try {
            const response = await api.get(`/products?${queryParam_is_new}&${queryParam_accept_trade}&${queryParam_payment_methods}`);
            setFilteredList(response.data);

        } catch (error) {
            setFilteredList(null);
            const title = error instanceof AppError ? error.message : 'Não foi possível filtrar os anúncios, tente novamente mais tarde.'

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.100'
            })
        } finally {
            setIsLoadingFilteredAdds(false);
            setIsModalOpen(false);
        }
    }

    const clearFilteredList = () => {
        setIsLoadingAdds(true);
        setFilteredList(null);
        setIsLoadingAdds(false);
    }

    const fetchAllAdds = async () => {
        try {
            const response = await api.get('/products');
            setAllAddsList(response.data);

        } catch (error) {
            const title = error instanceof AppError ? error.message : 'Não foi possível carregar os anúncios, tente novamente mais tarde';

            toast.show({
                title, 
                placement: 'top', 
                bgColor: 'red.100'
            })
        } finally {
            setIsLoadingAdds(false);
        }
    }

    useEffect(() => {
        fetchAllAdds();

    }, [])

    return (
        isLoadingAdds ? <Loading /> :

        allAddsList.length > 0 ?

        <VStack flex = {1} mt = {6}>
            <Text fontFamily = 'body' fontSize = 'md' color = 'gray.300'>
                Compre produtos variados
            </Text>

            <HStack mt = {4} w = '100%' bgColor = 'gray.700' rounded = 'md' p = {2} alignItems = 'center'>
                <Input 
                    placeholder = 'Buscar anúncio'
                    fontSize = 'lg'
                    h = {8}
                    placeholderTextColor = 'gray.400'
                    flex = {1}
                    borderWidth = {0}
                    _focus = {{
                        bgColor: 'gray.700',
                    }}
                />

                <Icon 
                    as = {Ionicons}
                    name = 'search'
                    size = {6}
                    color = 'gray.100'
                    ml = {2}
                />

                <Text color = 'gray.400' fontSize = 'xl' mx = {1}> | </Text>
                
                <Pressable onPress = {() => setIsModalOpen(true)}>
                    <Icon 
                        as = {Ionicons}
                        name = 'options-outline'
                        size = {6}
                        color = 'gray.100'        
                    />
                </Pressable>
            </HStack>

            <ScrollView flex = {1} mt = {4} showsVerticalScrollIndicator = {false}>
                { !filteredList ?
                <HStack flexWrap = 'wrap' justifyContent = 'space-between' pb = {10}>
                    {
                        allAddsList.map(add => {
                            return (
                                <AddProduct 
                                    product = {add}
                                    key = {add.id}
                                />
                            )
                        })
                    }
                </HStack>
                
                :
                <>
                    <Pressable alignSelf = 'flex-end' onPress = {clearFilteredList}>
                        <Icon 
                            as = {Ionicons}
                            name = 'close'
                            size = {6}
                            color = 'gray.300'
                        />
                    </Pressable>

                    { filteredList.length > 0 ?
                    <HStack flexWrap = 'wrap' justifyContent = 'space-between' pb = {10}>
                        {
                            filteredList.map(add => {
                                return (
                                    <AddProduct 
                                        product = {add}
                                        key = {add.id}
                                    />
                                )
                            })
                        }
                    </HStack>
                    :
                    <Text fontSize = 'lg' fontFamily = 'body' color = 'gray.300' mt = {10} fontStyle = 'italic'>
                        Não encontramos nenhum anúncio compatível com os dados do filtro...
                    </Text>
                    }
                </>
                }
            </ScrollView>

            <Modal isOpen = {isModalOpen} onClose = {() => setIsModalOpen(false)} >
                <Modal.Content marginBottom = {0} marginTop = 'auto' w = '100%' bgColor = 'gray.600' pb = {10}>
                    <AddsFilterForm 
                        setIsModalOpen = {setIsModalOpen}
                        fetchFilteredAdds = {fetchFilteredAdds}
                        isLoadingFilteredAdds = {isLoadingFilteredAdds}
                    />

                </Modal.Content>
            </Modal>
        </VStack>

        :

        <Text fontSize = 'lg' fontFamily = 'body' color = 'gray.300' mt = {10} fontStyle = 'italic'> 
            Nenhum anúncio foi encontrado... 
        </Text>
    )

}

export default AllAddsList;