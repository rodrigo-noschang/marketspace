import { useCallback, useState } from 'react';
import { Alert, Switch } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Box, ScrollView, VStack, Heading, Text, Radio, HStack } from 'native-base';

import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


import Input from './Input';
import Button from './Button';
import CheckBoxInput from './CheckBoxInput';
import NewAddPhotoSelector from './NewAddPhotoSelector';

import { NewProductAddDTO, PaymentOptions, NewProductImage } from '@dtos/AddsDTO';
import { useNewAdd } from '@contexts/newAddContext';
import { AddsRoutesNavigationProps } from '@routes/adds.routes';

type FormInputsProps = {
    name: string, 
    description: string,
    price: number,
    is_new: string
}

const formSchema = yup.object({
    name: yup.string().required('Informe o nome do produto'),
    description: yup.string().required('Forneça uma descrição para o produto'),
    is_new: yup.string()
})

const NewAddForm = () => {
    const [acceptsTrade, setAcceptsTrade] = useState(false);
    const [selectedPaymentOptions, setSelectedPaymentOptions] = useState<PaymentOptions[]>([]);
    const [controlledPriceInput, setControlledPriceInput] = useState('0,00');
    const [priceInputError, setPriceInputError] = useState('');

    const { control, handleSubmit, formState: { errors } } = useForm<FormInputsProps>({
        resolver: yupResolver(formSchema)
    });

    const navigator = useNavigation<AddsRoutesNavigationProps>();
    const { newAddImages, setNewAdd } = useNewAdd();

    const formatPriceInput = (price: string) => {
        setPriceInputError('');
        const priceWithoutTheComma = Number(price.replace(',', ''));

        const newPrice = (priceWithoutTheComma/100).toFixed(2).replace('.', ',');
        setControlledPriceInput(newPrice);
    }

    const adaptFormInputsToApiPattern = (data: FormInputsProps) => {
        data.is_new = data.is_new ? data.is_new : 'new';
        data.price = Number(controlledPriceInput.replace(',', ''));

        const newAddData: NewProductAddDTO = {
            ...data, 
            payment_methods: selectedPaymentOptions,
            accept_trade: acceptsTrade,
            is_new: data.is_new === 'new'
        }
        
        setNewAdd(newAddData);
    }

    const handleCreateNewAdd = (data: FormInputsProps) => {
        if (controlledPriceInput === '0,00') {
            setPriceInputError('Defina um preço para seu produto');
            return;
        }

        if (selectedPaymentOptions.length === 0) {
            return Alert.alert('Informe as opções de pagamento', 'Selecione ao menos uma opção de pagamento');
        }

        if (newAddImages.length === 0) {
            return Alert.alert('Adicione imagens do seu produto', 'Coloque até 3 imagens para dar um toque a mais no seu anúncio!');
        }


        adaptFormInputsToApiPattern(data);
        
        navigator.navigate('newAddPreview');
    }

    return (
        <>
            <ScrollView showsVerticalScrollIndicator = {false} bgColor = 'gray.700' pb = {20}> 
                <VStack px = {6} bgColor = 'gray.600' pb = {4}>
                    <Heading fontSize = 'lg' color = 'gray.200' fontFamily = 'heading' mt = {2}>
                        Imagens
                    </Heading>

                    <Text fontSize = 'md' color = 'gray.200' fontFamily = 'body' mt = {1}>
                        Escolha até 3 imagens para mostrar o quanto o seu produto é incrível!
                    </Text>

                    <NewAddPhotoSelector 
                        
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
                                    <Radio value = 'new' p = {0.5}>
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

                    <Input 
                        placeholder = 'Valor do produto'
                        preText = 'R$'
                        keyboardType = 'numeric'
                        mt = {2}
                        onChangeText = {formatPriceInput}
                        value = {controlledPriceInput}
                        errorMessage = {priceInputError}
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
        </>
    )
}

export default NewAddForm;