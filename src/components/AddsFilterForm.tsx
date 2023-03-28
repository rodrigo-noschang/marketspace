import { useState } from 'react';
import { Switch } from 'react-native';
import { HStack, Heading, Pressable, Icon, VStack, Text, Box } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import { PaymentOptions } from '@dtos/AddsDTO';

import Button from './Button';
import CheckBoxInput from './CheckBoxInput';

type FilterParametersTypes = {
    is_new: boolean | undefined
    accept_trade: boolean | undefined
    payment_methods: PaymentOptions[]
}

type Props = {
    setIsModalOpen: (state: boolean) => void
    fetchFilteredAdds: (filterParameters: FilterParametersTypes) => void
    isLoadingFilteredAdds: boolean
}

const AddsFilterForm = ({ setIsModalOpen, fetchFilteredAdds, isLoadingFilteredAdds }: Props) => {
    const [condition, setCondition] = useState<'new' | 'used' | undefined>(undefined);
    const [acceptsTrade, setAcceptsTrade] = useState(false);
    const [selectedPaymentOptions, setSelectedPaymentOptions] = useState<PaymentOptions[]>([]);

    const assembleFilterObject = () => {
        const filterParameters = {
            is_new: condition === 'new' ? true : condition === 'used' ? false : undefined,
            accept_trade: acceptsTrade,
            payment_methods: selectedPaymentOptions
        }

        fetchFilteredAdds(filterParameters);
    }

    const resetFilterParameters = () => {
        setCondition(undefined);
        setAcceptsTrade(false);
        setSelectedPaymentOptions([]);
    }

    return (
        <VStack  px = {6} pt = {10}>
            <HStack alignItems = 'center' justifyContent = 'space-between'>
                <Heading fontFamily = 'heading' fontSize = 'xl' color = 'gray.100'> 
                    Filtrar anúncios 
                </Heading>

                <Pressable onPress = {() => setIsModalOpen(false)}>
                    <Icon 
                        as = {Ionicons}
                        name = 'close'
                        size = {7}
                        color = 'gray.400'
                    />
                </Pressable>
            </HStack>

            <Heading fontFamily = 'heading' fontSize = 'md' color = 'gray.100' mt = {6}> 
                Condição 
            </Heading>

            <HStack mt = {3}>
                <Pressable onPress = {() => setCondition(!condition ? 'new' : undefined)}
                    bgColor = {condition === 'new' ? 'blue.200' : 'gray.500'} 
                    px = {3} py = {1} rounded = 'full'
                >
                    <HStack alignItems = 'center'>
                        <Text fontSize = 'sm' fontFamily = 'body' color = {condition === 'new' ? 'gray.700' : 'gray.100'}> 
                            NOVO 
                        </Text>

                        { condition === 'new' && 
                        <Icon 
                            as = {Ionicons}
                            name = 'close'
                            size = {3}
                            color = 'gray.300'
                            bgColor = 'gray.700'
                            rounded = 'full'
                            ml = {2}
                        />}
                    </HStack>
                </Pressable>

                <Pressable onPress = {() => setCondition(!condition ? 'used' : undefined)}
                    bgColor = {condition === 'used' ? 'blue.200' : 'gray.500'} 
                    px = {3} py = {1} rounded = 'full' ml = {3}
                >
                    <HStack alignItems = 'center'>
                        <Text fontSize = 'sm' fontFamily = 'body' color = {condition === 'used' ? 'gray.700' : 'gray.100'}> 
                            USADO
                        </Text>

                        { condition === 'used' && <Icon 
                            as = {Ionicons}
                            name = 'close'
                            size = {3}
                            color = 'gray.300'
                            bgColor = 'gray.700'
                            rounded = 'full'
                            ml = {2}
                        />}
                    </HStack>
                </Pressable>

            </HStack>

            <Heading fontFamily = 'heading' fontSize = 'md' color = 'gray.100' mt = {6}>
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

            <Heading fontFamily = 'heading' fontSize = 'md' color = 'gray.100' mt = {3} mb = {4}>
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

            <HStack mt = {9} justifyContent = 'space-between'>
                <Button 
                    title = 'Resetar filtros'
                    buttonTheme = 'light'
                    w = '48%'
                    onPress = {resetFilterParameters}
                />

                <Button 
                    title = 'Aplicar filtros'
                    buttonTheme = 'dark'
                    w = '48%'
                    onPress = {assembleFilterObject}
                    isLoading = {isLoadingFilteredAdds}
                />
            </HStack>
        </VStack>
    )
}

export default AddsFilterForm;