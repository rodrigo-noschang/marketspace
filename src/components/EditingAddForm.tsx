import { useCallback, useState } from 'react';
import { Alert, Switch } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Box, ScrollView, VStack, Heading, Text, Radio, HStack, useToast } from 'native-base';

import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Input from './Input';
import Button from './Button';
import CheckBoxInput from './CheckBoxInput';
import NewAddPhotoSelector from './NewAddPhotoSelector';

import api from '@services/api';
import { AppError } from '@utils/AppError';
import { useNewAdd } from '@contexts/newAddContext';
import { DatabaseProductDTO } from '@dtos/ProductDTO';
import { AddsRoutesNavigationProps } from '@routes/adds.routes';
import { NewProductAddDTO, PaymentOptions, NewProductImage } from '@dtos/AddsDTO';

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

type Props = {
    addData: DatabaseProductDTO
}

const EditingAddForm = ({ addData }: Props) => {
    const [acceptsTrade, setAcceptsTrade] = useState(addData.accept_trade);
    const [selectedPaymentOptions, setSelectedPaymentOptions] = useState<PaymentOptions[]>(addData.payment_methods.map(method => method.key));
    const [controlledPriceInput, setControlledPriceInput] = useState((addData.price/100).toFixed(2).replace('.', ','));
    const [priceInputError, setPriceInputError] = useState('');
    const [updateNewImages, setUpdatedNewImages] = useState<NewProductImage[]>([]);
    const [imagesIdToBeDeleted, setImagesIdToBeDeleted] = useState<string[]>([]);

    const { control, handleSubmit, formState: { errors } } = useForm<FormInputsProps>({
        resolver: yupResolver(formSchema)
    });

    const navigator = useNavigation<AddsRoutesNavigationProps>();
    const { setNewAddImages } = useNewAdd(); // Reset this when the add is updated
    const toast = useToast();

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
        
        return newAddData;
    }

    const deleteOldImages = async () => {
        const config = {
            data: {
                productImagesIds: imagesIdToBeDeleted
            }
        }

        try {
            await api.delete('/products/images', config);
        } catch (error) {
            const title = error instanceof AppError ? error.message : 'Não foi possível deletar a imagem, tente novamente mais tarde';

            toast.show({
                title, 
                placement: 'top',
                bgColor: 'red.100'
            })
        }
    }

    const updateProductImages = async (imagesForm: FormData) => {
        try {
            await api.post('/products/images', imagesForm, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        } catch (error) {
            const title = error instanceof AppError ? error.message : 'Não foi possível deletar a imagem, tente novamente mais tarde';

            toast.show({
                title, 
                placement: 'top',
                bgColor: 'red.100'
            })
        }
    }

    const assemblyImagesForm = () => {
        const updateImagesForm = new FormData();

        updateImagesForm.append('product_id', addData.id);
        
        for (const newImage of updateNewImages) {
            console.log('Imagem Nova -> ', newImage);
            updateImagesForm.append('images', newImage as any);
        }

        return updateImagesForm;
    }

    const updateImages = async () => {
        if (imagesIdToBeDeleted.length > 0) {
            await deleteOldImages();
        }

        if (updateNewImages.length > 0) {
            const newImagesForm = assemblyImagesForm();
    
            await updateProductImages(newImagesForm);
        }

        setNewAddImages([]);
    }

    const editAddData = async (data: FormInputsProps) => {
        if (controlledPriceInput === '0,00') {
            setPriceInputError('Defina um preço para seu produto');
            return;
        }

        if (selectedPaymentOptions.length === 0) {
            return Alert.alert('Informe as opções de pagamento', 'Selecione ao menos uma opção de pagamento');
        }

        if (updateNewImages.length + addData.product_images.length === 0) {
            return Alert.alert('Adicione imagens do seu produto', 'Coloque até 3 imagens para dar um toque a mais no seu anúncio!');
        }

        const addUpdatedData = adaptFormInputsToApiPattern(data);
        await updateImages();
        navigator.navigate('appHome');
    }

    const addImageIdToBeDeleted = (imageId: string) => {
        setImagesIdToBeDeleted([...imagesIdToBeDeleted, imageId]);
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
                        existingAddImages = {addData.product_images}
                        setUpdatedNewImages = {setUpdatedNewImages}
                        addImageIdToBeDeleted = {addImageIdToBeDeleted}
                        updateNewImages = {updateNewImages}
                        productId = {addData.id}
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
                                defaultValue = {addData.name}
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
                                defaultValue = {addData.description}
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
                                value = {addData.is_new ? 'new' : 'old'}
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
                        onPress = {handleSubmit(editAddData)} 
                    />
                </HStack>
            </ScrollView>
        </>
    )
}

export default EditingAddForm;