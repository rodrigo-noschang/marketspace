import { Pressable as NativeBaseButton, IPressableProps, Text, Icon, HStack } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

type ButtonThemes = 'blue' | 'dark' | 'light'

type Props = IPressableProps & {
    title: string,
    buttonTheme: ButtonThemes,
    iconName?: keyof typeof AntDesign.glyphMap
}

const Button = ({ title, buttonTheme, iconName, ...rest }: Props) => {
    return (
        <NativeBaseButton
            bgColor = {buttonTheme === 'blue' ? 'blue.200' : buttonTheme === 'dark' ? 'gray.100' : 'gray.500'}
            p = {2}
            borderRadius = {5}
            _pressed = {{
                bgColor: 'gray.500'
            }}
            {...rest}
        >
            <HStack alignItems = 'center' justifyContent = 'center'>
                { iconName &&
                    <Icon 
                        as = {AntDesign}
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
            </HStack>
            
        </NativeBaseButton>
    )
}

export default Button;