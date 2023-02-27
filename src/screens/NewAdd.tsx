import { useState } from 'react';
import { Alert, Switch } from 'react-native';
import { VStack, Heading, ScrollView, Text, Radio, HStack, Box } from 'native-base';
import { useNavigation } from '@react-navigation/native'

import { AddsRoutesNavigationProps } from '@routes/adds.routes';

import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useNewAdd } from '@contexts/newAddContext';

import Input from '@components/Input';
import Button from '@components/Button';
import AppHeader from '@components/AppHeader';
import CheckBoxInput from '@components/CheckBoxInput';
import NewAddPhotoSelector from '@components/NewAddPhotoSelector';

import { NewProductAddDTO, PaymentOptions } from '@dtos/AddsDTO';

type PhotoObject = {
    name: string, 
    uri: string,
    type: string
}

type FormInputsProps = {
    name: string, 
    description: string,
    price: number,
    is_new: string
}

const formSchema = yup.object({
    name: yup.string().required('Informe o nome do produto'),
    description: yup.string().required('Forneça uma descrição para o produto'),
    price: yup.number().required('Informe o preço do produto'),
    is_new: yup.string()
})

const NewAdd = () => {
    const [productsPhotos, setProductsPhotos] = useState<PhotoObject[]>([]);
    const [acceptsTrade, setAcceptsTrade] = useState(false);
    const [selectedPaymentOptions, setSelectedPaymentOptions] = useState<PaymentOptions[]>([]);

    const { control, handleSubmit, formState: { errors } } = useForm<FormInputsProps>({
        resolver: yupResolver(formSchema)
    });

    const navigator = useNavigation<AddsRoutesNavigationProps>();
    const { setNewAdd, setNewAddImages } = useNewAdd();

    const handleCreateNewAdd = (data: FormInputsProps) => {
        data.is_new = data.is_new ? data.is_new : 'new';

        if (selectedPaymentOptions.length === 0) {
            return Alert.alert('Informe as opções de pagamento', 'Selecione ao menos uma opção de pagamento');
        }

        if (productsPhotos.length === 0) {
            return Alert.alert('Adicione imagens do seu produto', 'Coloque até 3 imagens para dar um toque a mais no seu anúncio!');
        }

        const newAddData: NewProductAddDTO = {
            ...data, 
            payment_methods: selectedPaymentOptions,
            accept_trade: acceptsTrade,
            is_new: data.is_new === 'new'
        }
        
        setNewAdd(newAddData);
        setNewAddImages(productsPhotos);
        navigator.navigate('newAddPreview');
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

                    <Controller 
                        control = {control}
                        name = 'name'
                        render = {({field: {onChange, value}}) => (
                            <Input
                                mt = {3} 
                                placeholder = 'Título do anúncio'
                                onChangeText = {onChange}
                                value = {value}
                                errorMessage = {errors.name?.message}
                            />
                        )}
                    />
                    
                    <Controller 
                        control = {control}
                        name = 'description'
                        render = {({ field: {onChange, value} }) => (
                            <Input 
                                mt = {3}
                                placeholder = 'Descrição do produto'
                                h = {130}
                                textAlignVertical = 'top'
                                multiline
                                onChangeText = {onChange}
                                value = {value}
                                errorMessage = {errors.description?.message}
                            />
                        )}
                    />

                    <Controller 
                        control = {control}
                        name = 'is_new'
                        render = {({field: {onChange, value}}) => (
                            
                            <Radio.Group
                                colorScheme = 'indigo'
                                name = 'productIsNew'
                                value = {value || 'new'}
                                onChange = {onChange}
                            >
                                <HStack w = '100%' justifyContent = 'space-between' mt = {4}>
                                    <Radio value = 'new' p = {0.5} >
                                        <Text fontSize = 'lg' fontFamily = 'body' color = 'gray.200' >
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
                        )}
                    />

                    <Heading fontSize = 'lg' color = 'gray.200' fontFamily = 'heading' mt = {6}>
                        Venda
                    </Heading>

                    <Controller 
                        control = {control}
                        name = 'price'
                        render = {({field: {onChange, value}}) => (
                            <Input 
                                placeholder = 'Valor do produto'
                                preText = 'R$'
                                keyboardType = 'numeric'
                                mt = {2}
                                onChangeText = {onChange}
                                value = {value ? (value).toString() : ''}
                                errorMessage = {errors.price?.message}
                            />
                        )}
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
                        onPress = {handleSubmit(handleCreateNewAdd)} 
                    />
                </HStack>
            </ScrollView>
        </VStack>
    )

}

export default NewAdd;