import { useState } from 'react';
import { Switch } from 'react-native';
import { VStack, Heading, ScrollView, Text, Radio, HStack, Box, Checkbox } from 'native-base';

import AppHeader from '@components/AppHeader';
import NewAddPhotoSelector from '@components/NewAddPhotoSelector';
import Input from '@components/Input';

type PhotoObject = {
    name: string, 
    uri: string,
    type: string
}

const NewAdd = () => {
    const [productsPhotos, setProductsPhotos] = useState<PhotoObject[]>([]);
    const [productIsNew, setProductIsNew] = useState('');
    const [acceptsTrade, setAcceptsTrade] = useState(false);
    const [acceptedPaymentMethods, setAcceptedPaymentMethods] = useState<string[]>([]);

    console.log(acceptedPaymentMethods);

    return (
        <ScrollView pt = {45} px = {6} flex = {1} showsVerticalScrollIndicator = {false}>
            <VStack >
                <AppHeader 
                    title = 'Criar anúncio'
                    returnable
                />

                <Heading fontSize = 'lg' color = 'gray.200' fontFamily = 'heading' mt = {2}>
                    Imagens
                </Heading>

                <Text fontSize = 'md' color = 'gray.200' fontFamily = 'body' mt = {1}>
                    Escolha até 3 imagens para mostrar o quanto o seu produto é incrível!
                </Text>

                <NewAddPhotoSelector 
                    productsPhotos = {productsPhotos}
                    setProductsPhotos = {setProductsPhotos}
                />

                <Heading fontSize = 'lg' color = 'gray.200' fontFamily = 'heading' mt = {6}>
                    Sobre o produto
                </Heading>

                <Input
                    mt = {3} 
                    placeholder = 'Título do anúncio'
                />

                <Input 
                    mt = {3}
                    placeholder = 'Descrição do produto'
                    h = {130}
                    textAlignVertical = 'top'
                    multiline
                />

                <Radio.Group
                    colorScheme = 'indigo'
                    name = 'productIsNew'
                    value = {productIsNew}
                    onChange = {(chosenValue) => {
                        setProductIsNew(chosenValue)
                    }}
                >
                    <HStack w = '100%' justifyContent = 'space-between' mt = {4}>
                        <Radio value = 'new' p = {0.5}>
                            Produto novo
                        </Radio>

                        <Radio value = 'old' p = {0.5}>
                            Produto usado
                        </Radio>
                    </HStack>

                </Radio.Group>

                <Heading fontSize = 'lg' color = 'gray.200' fontFamily = 'heading' mt = {6}>
                    Venda
                </Heading>

                <Input 
                    placeholder = 'Valor do produto'
                    preText = 'R$'
                    mt = {2}
                />

                <Heading fontSize = 'lg' color = 'gray.200' fontFamily = 'heading' mt = {6}>
                    Aceita troca?
                </Heading>

                <Box alignItems = 'flex-start'>
                    <Switch 
                        trackColor = {{false: '#D9D8DA', true: '#D9D8DA'}}
                        thumbColor = {acceptsTrade ? '#647AC7' : '#F7F7F8'}
                        value = {acceptsTrade}
                        onValueChange = {() => setAcceptsTrade(!acceptsTrade)}
                    />
                </Box>

                <Heading fontSize = 'lg' color = 'gray.200' fontFamily = 'heading' mt = {6}>
                    Meios de pagamento aceitos
                </Heading>

{/* // https://github.com/react-native-checkbox/react-native-checkbox */}
                <Checkbox.Group value = {acceptedPaymentMethods} onChange = {setAcceptedPaymentMethods}>
                    <Checkbox value = 'boleto'>
                        Boleto
                    </Checkbox>

                    <Checkbox value = 'pix'>
                        Pix
                    </Checkbox>

                    <Checkbox value = 'cash'>
                        Dinheiro
                    </Checkbox>

                    <Checkbox value = 'card'>
                        Cartão de Crédito
                    </Checkbox>

                    <Checkbox value = 'deposit'>
                        Depósito Bancário
                    </Checkbox>

                </Checkbox.Group>

            </VStack>
        </ScrollView>
    )

}

export default NewAdd;