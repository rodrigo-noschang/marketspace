import { useCallback, useEffect, useState } from 'react';
import { Dimensions, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { VStack, HStack, Image, Text, Badge, Heading, Icon, ScrollView, Box, Pressable, StatusBar } from 'native-base';

import Loading from '@components/Loading';
import AppHeader from '@components/AppHeader';
import FullScreenImageModal from '@components/FullScreenImageModal';

import api from '@services/api';
import { DatabaseProductDTO } from '@dtos/ProductDTO';

type RouteParams = {
    addId: string
}

type ProductOwner = {
    avatar: string,
    name: string,
    tel: string
}

type ProductFullInfo = DatabaseProductDTO & {
    user: ProductOwner
}

const ListingAddOverview = () => {
    const [addData, setAddData] = useState<ProductFullInfo>({} as ProductFullInfo);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isShowingFullScreenImage, setIsShowingFullScreenImage] = useState(false);
    const [fullSCreenImagePath, setFullScreenImagePath] = useState('');

    const route = useRoute();
    const { addId } = route.params as RouteParams;

    const paymentMethodsIcons = {
        boleto: 'barcode-scan',
        pix: 'qrcode',
        deposit: 'bank-outline',
        cash: 'cash',
        card: 'credit-card-outline'
    }

    const handleShowFullScreenImage = (imagePath: string) => {
        setFullScreenImagePath(imagePath);
        setIsShowingFullScreenImage(true);
    }

    const handleContactProductOwner = useCallback(async () => {
        try {
            const productOwnerWhatsAppURL = `https://wa.me/${addData.user.tel}`
            
            const supported = await Linking.canOpenURL(productOwnerWhatsAppURL);
    
            if (supported) {
                await Linking.openURL(productOwnerWhatsAppURL);
            }

        } catch (error){
            console.log(error)
        }

    }, [])

    const fetchAddData = async () => {
        setIsLoadingData(true);
        try {
            const response = await api.get(`/products/${addId}`);

            setAddData(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoadingData(false);
        }
    }

    useEffect(() => {
        fetchAddData();

    }, []);

    return (
        isLoadingData ? <Loading /> :

        <VStack pt = {8} flex = {1}>
            { isShowingFullScreenImage &&
                <FullScreenImageModal 
                    imagePath = {fullSCreenImagePath} 
                    setIsImageModalOpen = {setIsShowingFullScreenImage}
                />
            }

            <StatusBar 
                translucent = {true}
                backgroundColor = 'transparent'
            />
            <Box px = {6}>
                <AppHeader 
                    returnable
                    title = ''    
                />
            </Box>

            <Box flex = {1}>
                <ScrollView bgColor = 'gray.600' showsVerticalScrollIndicator = {false} flex = {1}>
                    <Carousel 
                        width = {Dimensions.get('window').width} 
                        height = {275}
                        data = {addData.product_images}
                        scrollAnimationDuration = {1000}
                        loop = {false}
                        renderItem = {({ item }) => (
                            <Pressable onPress = {() => handleShowFullScreenImage(item.path)}>
                                <Image 
                                    w = '100%'
                                    h = '100%'
                                    source = {{uri: `${api.defaults.baseURL}/images/${item.path}`}}
                                    alt = 'Imagem do produto'
                                />
                            </Pressable>
                        )}
                    />
                
                    <VStack pb = {6} px = {6}>
                        <HStack alignItems = 'center' mt = {4}>
                            <Image 
                                source = {{uri: `${api.defaults.baseURL}/images/${addData.user.avatar}`}}
                                alt = 'User profile photo'
                                w = {10}
                                h = {10}
                                rounded = 'full'
                                borderWidth = {2}
                                borderColor = 'gray.100'
                            />

                            <Text fontFamily = 'body' fontSize = 'md' color = 'gray.200' ml = {2}> 
                                {addData.user.name} 
                            </Text>
                        </HStack>

                        <Badge
                            alignSelf = 'flex-start'
                            rounded = 'full'
                            px = {1}
                            py = {0}
                            bgColor = {addData.is_new ? 'blue.200' : 'gray.500'}
                            mt = {6}
                        >
                            <Text fontSize = 'xs' fontFamily = 'heading' color = {addData.is_new ? 'gray.700' : 'gray.200'}>
                                {addData.is_new ? 'NOVO' : 'USADO'}
                            </Text>
                        </Badge>

                        <HStack mt = {3} alignItems = 'flex-start'>
                            <Heading fontSize = 'xl' fontFamily = 'heading' color = 'gray.200' flex = {1}>
                                {addData.name}
                            </Heading>

                            <Heading fontSize = 'sm' fontFamily = 'heading' color = 'blue.200' mt = {2}>
                                R$
                            </Heading>
                            <Heading fontSize = 'xl' fontFamily = 'heading' color = 'blue.200' ml = {1}>
                                {(addData.price/100).toFixed(2).replace('.', ',')}
                            </Heading>
                        </HStack>

                        <Text fontFamily = 'body' fontSize = 'md' color = 'gray.200' mt = {2}>
                            {addData.description}
                        </Text>

                        <HStack mt = {4} alignItems = 'center'>
                            <Heading fontFamily = 'heading' fontSize = 'md' color = 'gray.200'>
                                Aceita troca?
                            </Heading>

                            <Text fontFamily = 'body' fontSize = 'md' color = 'gray.200' ml = {2}>
                                {addData.accept_trade ? 'Sim' : 'Não'}
                            </Text>
                        </HStack>

                        <Heading fontFamily = 'heading' fontSize = 'md' color = 'gray.200' mt = {4}>
                            Meios de pagamento
                        </Heading>

                        { addData.payment_methods.map(method => (
                            <HStack alignItems = 'flex-end' mt = {1} key = {method.key}>
                                <Icon
                                    as = {MaterialCommunityIcons}
                                    size = {5}
                                    name = {paymentMethodsIcons[method.key]}
                                    color = 'gray.200'
                                />

                                <Text fontFamily = 'body' fontSize = 'md' color = 'gray.200' ml = {1}>
                                    {method.name}
                                </Text>
                            </HStack>
                        ))}

                    </VStack>
                    <HStack bgColor = 'gray.700' p = {6} justifyContent = 'space-between' alignItems = 'center'>
                        <HStack alignItems = 'flex-end'>
                            <Text fontFamily = 'heading' fontSize = 'md' color = 'blue.100'>
                                R$ 
                            </Text>
                                
                            <Heading fontFamily = 'heading' fontSize = 'xl' color = 'blue.100' ml = {1}>
                                {(addData.price/100).toFixed(2).replace('.', ',')}
                            </Heading>
                        </HStack>

                        <Pressable 
                            bgColor = 'blue.200' 
                            p = {3} 
                            rounded = 'md' 
                            onPress = {handleContactProductOwner}
                            _pressed = {{
                                bgColor: 'blue.300'
                            }}
                        >
                            <HStack alignItems = 'center'>
                                <Icon 
                                    as = {FontAwesome}
                                    name = 'whatsapp'
                                    size = {4}
                                    color = 'gray.700'
                                />

                                <Text fontFamily = 'heading' fontSize = 'md' color = 'gray.700' ml = {2}> 
                                    Entrar em contato 
                                </Text>
                            </HStack>
                        </Pressable>

                    </HStack>
                </ScrollView>
            </Box>
        </VStack>
    )

}

export default ListingAddOverview;