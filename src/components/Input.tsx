import { Input as NativeBaseInput, IInputProps, HStack, Text, Icon, Pressable } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

type Props = IInputProps & {
    isSecure?: boolean,
    preText?: string
}

const Input = ({ isSecure = false, preText = '', ...rest }: Props) => {
    const [hideInput, setHideInput] = useState(isSecure);

    const handleChangeInputVisibility = () => {
        setHideInput(!hideInput);
    }

    return(
        <HStack bgColor = 'gray.700' width = '100%' alignItems = 'center' mt = {5} px = {2} py = {0} borderRadius = {5}>

            { preText.length > 0 &&
                <Text fontSize = 'lg' fontFamily = 'body' color = 'gray.100' mr = {1}>
                    {preText}
                </Text>
            }
            
            <NativeBaseInput 
                bgColor = 'gray.700'
                flex = {1}
                secureTextEntry = {(isSecure && hideInput)}
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
    )
}

export default Input;