import { ReactNode, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { VStack, HStack, Image, Text, Badge, Heading, Icon, ScrollView, Box } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Carousel from 'react-native-reanimated-carousel';

import Loading from './Loading';

import { NewProductImage, PaymentOptions } from '@dtos/AddsDTO';
import { NewProductAddDTO } from '@dtos/AddsDTO';
import { DatabaseImages, DatabasePaymentOptions, DatabaseProductDTO } from '@dtos/ProductDTO';

import api from '@services/api';
import { useAuth } from '@contexts/authContext';
import { useNewAdd } from '@contexts/newAddContext';
import { useUserAdds } from '@contexts/userAddsContext';

type AddOptions = 'new' | 'existing';

type Props = {
    addType: AddOptions,
    children?: ReactNode
}

const ProductsInfo = ({ addType, children }: Props) => {
    const [productUsableData, setProductUsableData] = useState<NewProductAddDTO>({} as NewProductAddDTO);
    const [productUsableImages, setProductUsableImages] = useState<NewProductImage[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { user } = useAuth();
    const { onFocusAdd } = useUserAdds();
    const { newAdd, newAddImages } = useNewAdd();

    const paymentMethodsIcons = {
        boleto: 'barcode-scan',
        pix: 'qrcode',
        deposit: 'bank-outline',
        cash: 'cash',
        card: 'credit-card-outline'
    }

    const paymentMethodsTranslation = {
        boleto: 'Boleto',
        pix: 'Pix',
        deposit: 'Depósito',
        cash: 'Dinheiro',
        card: 'Cartão de crédito'
    }

    const setPaymentMethodsToAddsDTOStandard = (databaseMethods: DatabasePaymentOptions[]) => {
        return databaseMethods.map(method => method.key);
    }
    
    const setProductImagesToAddsDTOStandard = (databaseImages: DatabaseImages[]) => {
        const productImages = databaseImages.map((image, i) => {
            
            return {
                name: '',
                type: '',
                uri: `${api.defaults.baseURL}/images/${image.path}`
            }
        })

        return productImages;
    }

    const checkAddTypeAndFormatData = () => {
        setIsLoading(true);

        if (addType === 'existing') {
            const databasePaymentMethods = onFocusAdd?.payment_methods;
            const databaseImages = onFocusAdd?.product_images;

            if (!databasePaymentMethods || !databaseImages) return;

            const standardPaymentMethods = setPaymentMethodsToAddsDTOStandard(databasePaymentMethods);
            const standardImages = setProductImagesToAddsDTOStandard(databaseImages);

            const usableData = {
                ...onFocusAdd,
                payment_methods: standardPaymentMethods,
            }
        
            setProductUsableData(usableData);
            setProductUsableImages(standardImages);
        } else {
            setProductUsableData(newAdd);
            setProductUsableImages(newAddImages);
        }
        
        setIsLoading(false);
    }

    useEffect(() => {
        checkAddTypeAndFormatData();
    }, []);

    return (
        isLoading ?
            <Box flex = {1}>
                <Loading />
            </Box>
        :
        
        <Box flex = {1}>
            <Carousel 
                width = {Dimensions.get('window').width} 
                height = {350}
                data = {productUsableImages}
                scrollAnimationDuration = {1000}
                loop = {false}
                renderItem = {({ item }) => (
                    <Image 
                        w = '100%'
                        h = '100%'
                        source = {{uri: item.uri}}
                        alt = 'Imagem do produto'
                    />
                )}
            />
            
            <ScrollView bgColor = 'gray.600' showsVerticalScrollIndicator = {false} px = {6} flex = {1}>
                <VStack pb = {6}>
                    <HStack alignItems = 'center' mt = {4}>
                        <Image 
                            source = {{uri: `${api.defaults.baseURL}/images/${user.avatar}`}}
                            alt = 'User profile photo'
                            w = {10}
                            h = {10}
                            rounded = 'full'
                            borderWidth = {2}
                            borderColor = 'gray.100'
                        />

                        <Text fontFamily = 'body' fontSize = 'md' color = 'gray.200' ml = {2}> 
                            {user.name} 
                        </Text>
                    </HStack>

                    <Badge
                        alignSelf = 'flex-start'
                        rounded = 'full'
                        px = {1}
                        py = {0}
                        bgColor = {productUsableData.is_new ? 'blue.200' : 'gray.500'}
                        mt = {6}
                    >
                        <Text fontSize = 'xs' fontFamily = 'heading' color = {productUsableData.is_new ? 'gray.700' : 'gray.200'}>
                            {productUsableData.is_new ? 'NOVO' : 'USADO'}
                        </Text>
                    </Badge>

                    <HStack mt = {3} alignItems = 'flex-start'>
                        <Heading fontSize = 'xl' fontFamily = 'heading' color = 'gray.200' flex = {1}>
                            {productUsableData.name}
                        </Heading>

                        <Heading fontSize = 'sm' fontFamily = 'heading' color = 'blue.200' mt = {2}>
                            R$
                        </Heading>
                        <Heading fontSize = 'xl' fontFamily = 'heading' color = 'blue.200' ml = {1}>
                            {(productUsableData.price/100).toFixed(2).replace('.', ',')}
                        </Heading>
                    </HStack>

                    <Text fontFamily = 'body' fontSize = 'md' color = 'gray.200' mt = {2}>
                        {productUsableData.description}
                    </Text>

                    <HStack mt = {4} alignItems = 'center'>
                        <Heading fontFamily = 'heading' fontSize = 'md' color = 'gray.200'>
                            Aceita troca?
                        </Heading>

                        <Text fontFamily = 'body' fontSize = 'md' color = 'gray.200' ml = {2}>
                            {productUsableData.accept_trade ? 'Sim' : 'Não'}
                        </Text>
                    </HStack>

                    <Heading fontFamily = 'heading' fontSize = 'md' color = 'gray.200' mt = {4}>
                        Meios de pagamento
                    </Heading>

                    { productUsableData.payment_methods.map(method => (
                        <HStack alignItems = 'flex-end' mt = {1} key = {method}>
                            <Icon
                                as = {MaterialCommunityIcons}
                                size = {5}
                                name = {paymentMethodsIcons[method]}
                                color = 'gray.200'
                            />

                            <Text fontFamily = 'body' fontSize = 'md' color = 'gray.200' ml = {1}>
                                {paymentMethodsTranslation[method]}
                            </Text>
                        </HStack>
                    ))}

                    {children}
                </VStack>
            </ScrollView>
        </Box>
    )
}

export default ProductsInfo;