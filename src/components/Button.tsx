import { Pressable as NativeBaseButton, IPressableProps, Text, Icon, HStack, Spinner } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

type ButtonThemes = 'blue' | 'dark' | 'light'

type Props = IPressableProps & {
    title: string,
    buttonTheme: ButtonThemes,
    isLoading?: boolean,
    iconName?: keyof typeof AntDesign.glyphMap,
    iconSize?: number
}

const Button = ({ title, buttonTheme, iconName, iconSize = 4, isLoading, ...rest }: Props) => {
    return (
        <NativeBaseButton
            bgColor = {buttonTheme === 'blue' ? 'blue.200' : buttonTheme === 'dark' ? 'gray.100' : 'gray.500'}
            p = {2}
            borderRadius = {5}
            disabled = {isLoading}
            _pressed = {{
                bgColor: 'gray.500'
            }}
            _disabled = {{
                bgColor: 'gray.400'
            }}
            {...rest}
        >
            <HStack alignItems = 'center' justifyContent = 'center'>
                { iconName &&
                    <Icon 
                        as = {AntDesign}
                        size = {iconSize}
                        color = {buttonTheme === 'dark' || buttonTheme === 'blue' ? 'gray.700' : 'gray.100'}
                        name = {iconName}
                        mr = {3}
                    />
                }

                <Text 
                    fontFamily = 'heading' 
                    fontSize = 'md'
                    color = {buttonTheme === 'dark' || buttonTheme === 'blue' ? 'gray.700' : 'gray.100'}
                > 
                    { title } 
                </Text>

                { isLoading &&
                    <Spinner 
                        size = {14}
                        color = {buttonTheme === 'dark' || buttonTheme === 'blue' ? 'gray.700' : 'gray.100'}
                        ml = {3}
                    />
                }
            </HStack>
            
        </NativeBaseButton>
    )
}

export default Button;