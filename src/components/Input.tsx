import { Input as NativeBaseInput, IInputProps, HStack, Text, Icon, Pressable, FormControl, Center } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

type Props = IInputProps & {
    isSecure?: boolean,
    preText?: string,
    errorMessage?: string | null
}

const Input = ({ isSecure = false, preText = '', mt, errorMessage, ...rest }: Props) => {
    const [hideInput, setHideInput] = useState(true);

    const handleChangeInputVisibility = () => {
        setHideInput(!hideInput);
    }

    return(
        <FormControl isInvalid = {!!errorMessage}>
            <HStack 
                bgColor = 'gray.700' 
                width = '100%' 
                alignItems = 'center' px = {2} 
                py = {0} 
                borderWidth = {1}
                borderColor = {errorMessage ? '#f00' : 'transparent'}
                borderRadius = {6} mt = {mt}
            >

                { preText.length > 0 &&
                    <Text fontSize = 'lg' fontFamily = 'body' color = 'gray.100' mr = {1}>
                        {preText}
                    </Text>
                }
                
                <NativeBaseInput 
                    bgColor = 'gray.700'
                    flex = {1}
                    secureTextEntry = {isSecure && hideInput}
                    fontSize = 'lg'
                    borderWidth = {0}
                    {...rest}
                />
                
                { isSecure &&
                    <Pressable px = {1} onPress = {handleChangeInputVisibility}>
                        <Icon
                            as = {Ionicons}
                            name = {hideInput ? 'eye-outline' : 'eye-off-outline'}
                            size = {22}
                            color = 'gray.400'
                        />
                    </Pressable>
                }

            </HStack>

            <Center>
                <FormControl.ErrorMessage>        
                    <Text fontSize = 'sm'> 
                        {errorMessage} 
                    </Text>
                </FormControl.ErrorMessage>
            </Center>
        </FormControl>
    )
}

export default Input;