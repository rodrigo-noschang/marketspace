import { ReactNode } from 'react';
import { Dimensions } from 'react-native';
import { VStack, HStack, Image, Text, Badge, Heading, Icon, ScrollView } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Carousel from 'react-native-reanimated-carousel';

import { UserDTO } from '@dtos/UserDTO';
import { ProductImage } from '@dtos/AddsDTO';
import { NewProductAddDTO } from '@dtos/AddsDTO';

import api from '@services/api';

type Props = {
    productAnnouncer: UserDTO,
    productData: NewProductAddDTO,
    productImages: ProductImage[],
    children?: ReactNode
}

const ProductsInfo = ({ productAnnouncer, productData, productImages, children }: Props) => {
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

    return (
        <>
            <Carousel 
                width = {Dimensions.get('window').width} 
                height = {350}
                data = {productImages}
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

            <ScrollView flex = {1} bgColor = 'gray.600' px = {6} showsVerticalScrollIndicator = {false}>
                <VStack pb = {6}>
                    <HStack alignItems = 'center' mt = {4}>
                        <Image 
                            source = {{uri: `${api.defaults.baseURL}/images/${productAnnouncer.avatar}`}}
                            alt = 'User profile photo'
                            w = {10}
                            h = {10}
                            rounded = 'full'
                            borderWidth = {2}
                            borderColor = 'gray.100'
                        />

                        <Text fontFamily = 'body' fontSize = 'md' color = 'gray.200' ml = {2}> 
                            {productAnnouncer.name} 
                        </Text>
                    </HStack>

                    <Badge
                        alignSelf = 'flex-start'
                        rounded = 'full'
                        px = {1}
                        py = {0}
                        bgColor = {productData.is_new ? 'blue.200' : 'gray.500'}
                        mt = {6}
                    >
                        <Text fontSize = 'xs' fontFamily = 'heading' color = {productData.is_new ? 'gray.700' : 'gray.200'}>
                            {productData.is_new ? 'NOVO' : 'USADO'}
                        </Text>
                    </Badge>

                    <HStack mt = {3} alignItems = 'flex-start'>
                        <Heading fontSize = 'xl' fontFamily = 'heading' color = 'gray.200' flex = {1}>
                            {productData.name}
                        </Heading>

                        <Heading fontSize = 'sm' fontFamily = 'heading' color = 'blue.200' mt = {2}>
                            R$
                        </Heading>
                        <Heading fontSize = 'xl' fontFamily = 'heading' color = 'blue.200' ml = {1}>
                            {(productData.price/100).toFixed(2).replace('.', ',')}
                        </Heading>
                    </HStack>

                    <Text fontFamily = 'body' fontSize = 'md' color = 'gray.200' mt = {2}>
                        {productData.description}
                    </Text>

                    <HStack mt = {4} alignItems = 'center'>
                        <Heading fontFamily = 'heading' fontSize = 'md' color = 'gray.200'>
                            Aceita troca?
                        </Heading>

                        <Text fontFamily = 'body' fontSize = 'md' color = 'gray.200' ml = {2}>
                            {productData.accept_trade ? 'Sim' : 'Não'}
                        </Text>
                    </HStack>

                    <Heading fontFamily = 'heading' fontSize = 'md' color = 'gray.200' mt = {4}>
                        Meios de pagamento
                    </Heading>

                    { productData.payment_methods.map(method => (
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
        </>
    )
}

export default ProductsInfo;