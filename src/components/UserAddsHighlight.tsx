import { useEffect } from 'react';
import { HStack, VStack, Box, Text, Icon, Heading, Pressable, IPressableProps, Skeleton } from 'native-base';
import { Octicons } from '@expo/vector-icons';

import { useUserAdds } from '@contexts/userAddsContext';

type Props = IPressableProps & {}

const UserAddsHighlight = ({ ...rest }: Props) => {
    const { userAdds, fetchUserAdds, userAddsError } = useUserAdds();
    const loadingAdds = !userAdds;

    useEffect(() => {
        fetchUserAdds();
    }, [])

    return (
        loadingAdds ? 
            <Skeleton 
                w = '100%'
                h = {60}
                startColor = 'blue.300'
                endColor = 'blue.400'
                borderWidth = {0}
                rounded = 'md'
                mt = {3}
            />
        :
            userAddsError ? 
                <Box w = '100%' h = {60} bgColor = 'blue.300' rounded = 'md' p = {4} alignItems = 'center' mt = {3}>
                    <Text fontSize = 'md' fontFamily = 'body' color = 'red.100'>
                        {userAddsError}
                    </Text>
                </Box>
            :
                <Pressable
                    mt = {3}
                    rounded = 'md'
                    _pressed = {{
                        bgColor: 'gray.500'
                    }}
                    {...rest}

                >
                    <HStack w = '100%' bgColor = 'blue.300' rounded = 'md' p = {4} alignItems = 'center'>
                        <Icon 
                            as = {Octicons}
                            name = 'tag'
                            size = {22}
                        />
                        
                        <VStack ml = {3} flex = {1}>
                            <Heading fontSize = 'xl' fontFamily = 'heading'>
                                {userAdds.length}
                            </Heading>
                            <Text> anúncios ativos </Text>
                        </VStack>

                        <Heading fontSize = 'md' color = 'blue.100' fontFamily = 'heading' mr = {2}>
                            Meus anúncios
                        </Heading>
                        <Icon 
                            as = {Octicons}
                            name = 'arrow-right'
                            size = {17}
                            color = 'blue.100'
                        />

                    </HStack>
                </Pressable>
    )

}

export default UserAddsHighlight;