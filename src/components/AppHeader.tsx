import { Alert } from 'react-native';
import { HStack, Icon, Heading, Pressable } from "native-base";
import { Octicons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

type Props = {
    title: string
    returnable?: boolean
    actionIcon?: 'plus' | 'edit',
    warningMessage?: string

    action?: () => void
}

const AppHeader = ({ title, returnable = false, action, actionIcon, warningMessage }: Props) => {
    const navigator = useNavigation()

    const handleReturnScreen = () => {
        if (warningMessage) {
            return Alert.alert('Atenção!', warningMessage, [
            {
                text: 'Retornar mesmo assim',
                onPress: () => navigator.goBack()
            },
            {
                text: 'Cancelar'
            }
            ]);
        }
        navigator.goBack();
    }

    return (
        <HStack  mt = {2} mb = {4} alignItems = 'center' position = 'relative'>
            { returnable &&
                <Pressable onPress = {handleReturnScreen}>
                    <Icon 
                        as = {Octicons}
                        name = 'arrow-left'
                        size = {6}
                        color = 'gray.400'
                    />
                </Pressable>
            }

            <Heading fontFamily = 'heading' fontSize = 'lg' color = 'gray.200' textAlign = 'center' flex = {1}>
                {title}
            </Heading>

            { action && actionIcon &&
                <Pressable onPress = {action}>
                    <Icon 
                        as = {AntDesign}
                        name = {actionIcon}
                        size = {6}
                        color = 'gray.400'
                    />
                </Pressable>
            }
        </HStack>
    )

}

export default AppHeader;