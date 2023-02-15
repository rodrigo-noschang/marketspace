import { VStack, HStack, Image, Text, Heading } from 'native-base';

import Button from './Button';

import api from "@services/api";

type Props = {
    avatar: string,
    name: string
}

const HomeHeader = ({ avatar, name }: Props) => {

    return ( 
        <HStack justifyContent = 'space-between' alignItems = 'center'>
            <HStack>
                { avatar &&
                    <Image 
                        source = {{uri: `${api.defaults.baseURL}/images/${avatar}`}}
                        alt = 'User profile image'
                        rounded = 'full'
                        w = {12}
                        h = {12}
                        borderWidth = {2}
                        borderColor = 'gray.100'
                    />
                }
                <VStack ml = {2}>
                    <Text fontSize = 'md' fontFamily = 'body' color = 'gray.200'> 
                        Boas vindas, 
                    </Text>
                    <Heading fontSize = 'lg' color = 'gray.200' mt = {1}> 
                        {name}! 
                    </Heading>
                </VStack>
            </HStack>

            <Button
                title = 'Criar anúncio'
                buttonTheme = 'dark'
                iconName = 'plus'
                iconSize = {4}
            />
        </HStack>
    )
}

export default HomeHeader;