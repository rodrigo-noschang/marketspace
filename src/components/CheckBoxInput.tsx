import { useState } from "react";
import { Box, HStack, Text, Icon, Pressable, IPressableProps, Center } from "native-base";
import { Feather } from '@expo/vector-icons';

import { PaymentOptions } from "@dtos/AddsDTO";

type Props = IPressableProps & {
    value: PaymentOptions,
    label: string,
    options: PaymentOptions[],
    updateOptions: (value: PaymentOptions[]) => void
}

const CheckBoxInput = ({ value, label, options, updateOptions, ...rest }: Props) => {
    const [isSelected, setIsSelected] = useState(false);

    const updatePaymentOptions = () => {
        if (!isSelected) {
            updateOptions([...options, value]);
        } else {
            const removedOption = options.filter(option => option !== value);
            updateOptions(removedOption);
        }
    }

    const changeBoxSelectedState = () => {
        setIsSelected(!isSelected)
    }

    const handleChangePaymentOptions = () => {
        updatePaymentOptions();
        changeBoxSelectedState();
    }

    return (
        <Pressable alignSelf = 'flex-start' onPress = {handleChangePaymentOptions} {...rest}> 
            <HStack alignItems = 'center'>
                <Box w = {5} 
                    h = {5} 
                    rounded = 'sm'
                    borderWidth = {isSelected ? 0 : 2} 
                    borderColor = 'gray.200' 
                    bgColor = {isSelected ? 'blue.200' : 'gray.600'}
                > 
                    { isSelected &&
                        <Center flex = {1} >
                            <Icon 
                                as = {Feather}
                                size = {3}
                                name = 'check'
                                color = 'gray.700'
                            />
                        </Center>
                    }
                </Box>

                <Text fontSize = 'lg' fontFamily = 'body' color = 'gray.200' ml = {3} > 
                    {label} 
                </Text>
            </HStack>
        </Pressable>
    )
}

export default CheckBoxInput;