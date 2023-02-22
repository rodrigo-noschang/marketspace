import { useState } from 'react';
import { Switch } from 'react-native';
import { VStack, Heading, ScrollView, Text, Radio, HStack, Box } from 'native-base';
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '@contexts/authContext';

import Input from '@components/Input';
import AppHeader from '@components/AppHeader';
import CheckBoxInput from '@components/CheckBoxInput';
import NewAddPhotoSelector from '@components/NewAddPhotoSelector';
import Button from '@components/Button';

type PhotoObject = {
    name: string, 
    uri: string,
    type: string
}

const NewAdd = () => {
    const [productsPhotos, setProductsPhotos] = useState<PhotoObject[]>([]);
    const [addTitle, setAddTitle] = useState('');
    const [addDescription, setAddDescription] = useState('');
    const [productIsNew, setProductIsNew] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [acceptsTrade, setAcceptsTrade] = useState(false);
    const [selectedPaymentOptions, setSelectedPaymentOptions] = useState<string[]>([]);

    const navigator = useNavigation();
    const { user } = useAuth();

    const handleCreateNewAdd = () => {
        const add = {
            name: addTitle,
            description: addDescription,
            is_new: productIsNew === 'new' ? true : productIsNew === 'old' ? false : null,
            price: productPrice,
            user_id: user.id,
            is_active: true
        }
    }
    
    return (
        <VStack flex = {1}>
            <Box pt = {45} px = {6} bgColor = 'gray.600'>
                <AppHeader 
                    title = 'Criar anúncio'
                    returnable
                />
            </Box>

            <ScrollView showsVerticalScrollIndicator = {false} bgColor = 'gray.700' pb = {20}> 
                <VStack px = {6} bgColor = 'gray.600' pb = {4}>
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
                        onChangeText = {setAddTitle}
                        />

                    <Input 
                        mt = {3}
                        placeholder = 'Descrição do produto'
                        h = {130}
                        textAlignVertical = 'top'
                        multiline
                        onChangeText = {setAddDescription}
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
                                <Text fontSize = 'lg' fontFamily = 'body' color = 'gray.200'>
                                    Produto novo
                                </Text>
                            </Radio>

                            <Radio value = 'old' p = {0.5}>
                                <Text fontSize = 'lg' fontFamily = 'body' color = 'gray.200'>
                                    Produto usado
                                </Text>
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
                        onChangeText = {setProductPrice}
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

                    <Heading fontSize = 'lg' color = 'gray.200' fontFamily = 'heading' mt = {3} mb = {3}>
                        Meios de pagamento aceitos
                    </Heading>

                    <CheckBoxInput 
                        value = 'boleto'
                        label = 'Boleto'
                        options = {selectedPaymentOptions}
                        updateOptions = {setSelectedPaymentOptions}
                        mb = {1}
                        
                    />

                    <CheckBoxInput 
                        value = 'pix'
                        label = 'Pix'
                        options = {selectedPaymentOptions}
                        updateOptions = {setSelectedPaymentOptions}
                        mb = {1}
                    />

                    <CheckBoxInput 
                        value = 'cash'
                        label = 'Dinheiro'
                        options = {selectedPaymentOptions}
                        updateOptions = {setSelectedPaymentOptions}
                        mb = {1}
                    />

                    <CheckBoxInput 
                        value = 'card'
                        label = 'Cartão de Crédito'
                        options = {selectedPaymentOptions}
                        updateOptions = {setSelectedPaymentOptions}
                        mb = {1}
                    />

                    <CheckBoxInput 
                        value = 'deposit'
                        label = 'Depósito Bancário'
                        options = {selectedPaymentOptions}
                        updateOptions = {setSelectedPaymentOptions}
                        mb = {1}
                    />
                </VStack>

                <HStack w = '100%' bgColor = 'gray.700' px = {6} py = {5} justifyContent = 'space-between'>
                    <Button 
                        title = 'Cancelar'
                        buttonTheme = 'light'
                        w = '48%'
                        onPress = {() => navigator.goBack()}
                    />
                    
                    <Button 
                        title = 'Avançar'
                        buttonTheme = 'dark'  
                        w = '48%'
                        onPress = {handleCreateNewAdd} 
                    />
                </HStack>
            </ScrollView>
        </VStack>
    )

}

export default NewAdd;