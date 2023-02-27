import { Dimensions } from "react-native";
import { Badge, HStack, Heading, Icon, Image, ScrollView, Text, VStack } from "native-base"
import Carousel from "react-native-reanimated-carousel";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useNewAdd } from "@contexts/newAddContext";
import { useAuth } from "@contexts/authContext";
import api from "@services/api";

import AddPreviewHeader from "@components/AddPreviewHeader";
import Button from "@components/Button";

const NewAddPreview = () => {
    const { newAdd, newAddImages } = useNewAdd();
    const { user } = useAuth();

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
        <VStack flex = {1} bgColor = 'gray.700'> 
            <AddPreviewHeader />

            <Carousel 
                width = {Dimensions.get('window').width} 
                height = {350}
                data = {newAddImages}
                scrollAnimationDuration = {1000}
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
                        bgColor = {newAdd.is_new ? 'blue.200' : 'gray.500'}
                        mt = {6}
                    >
                        <Text fontSize = 'xs' fontFamily = 'heading'>
                            {newAdd.is_new ? 'NOVO' : 'USADO'}
                        </Text>
                    </Badge>

                    <HStack mt = {3} alignItems = 'flex-start'>
                        <Heading fontSize = 'xl' fontFamily = 'heading' color = 'gray.200' flex = {1}>
                            {newAdd.name}
                        </Heading>

                        <Heading fontSize = 'sm' fontFamily = 'heading' color = 'blue.200' mt = {2}>
                            R$
                        </Heading>
                        <Heading fontSize = 'xl' fontFamily = 'heading' color = 'blue.200' ml = {1}>
                            {newAdd.price.toFixed(2).replace('.', ',')}
                        </Heading>
                    </HStack>

                    <Text fontFamily = 'body' fontSize = 'md' color = 'gray.200' mt = {2}>
                        {newAdd.description}
                    </Text>

                    <HStack mt = {4} alignItems = 'center'>
                        <Heading fontFamily = 'heading' fontSize = 'md' color = 'gray.200'>
                            Aceita troca?
                        </Heading>

                        <Text fontFamily = 'body' fontSize = 'md' color = 'gray.200' ml = {2}>
                            {newAdd.accept_trade ? 'Sim' : 'Não'}
                        </Text>
                    </HStack>

                    <Heading fontFamily = 'heading' fontSize = 'md' color = 'gray.200' mt = {4}>
                        Meios de pagamento
                    </Heading>

                    { newAdd.payment_methods.map(method => (
                        <HStack alignItems = 'flex-end' mt = {1}>
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
                </VStack>
            </ScrollView>

            <HStack px = {6} py = {6} justifyContent = 'space-between'>
                <Button 
                    title = 'Voltar e editar'
                    buttonTheme = 'light'
                    iconName = 'arrowleft'
                    w = '48%'
                />

                <Button 
                    title = 'Publicar'
                    buttonTheme = 'blue'
                    iconName = 'tag'
                    w = '48%'
                />
            </HStack>

        </VStack>
    )
}

export default NewAddPreview;