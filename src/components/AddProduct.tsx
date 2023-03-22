import { Pressable, IPressableProps, VStack, Image, Heading, Text, Badge, HStack, Box } from 'native-base';

import api from '@services/api';
import { DatabaseProductDTO } from '@dtos/ProductDTO';

type Props = IPressableProps & {
    product: DatabaseProductDTO
}

const AddProduct = ({ product, ...rest }: Props) => {

    return (
        <Pressable w = '47%' {...rest} mt = {5}>
            <Badge 
                position = 'absolute' 
                zIndex = {1} 
                alignSelf = 'flex-end' 
                bgColor = {product.is_new ? 'blue.100' : 'gray.200'} 
                rounded = 'full'
                px = {2}
                py = {0}
                mt = {1}
                right = {1}
                _text={{
                    color: 'gray.600',
                    fontSize: 'xs'
                }}
            >
                {product.is_new ? 'NOVO' : 'USADO'}
            </Badge>

            <VStack position = 'relative'>
                {!product.is_active && 
                    <>
                        <Box  w = '100%' h = {24} py = {2}
                            position = 'absolute'
                            bgColor = 'gray.300'
                            top = {0}
                            left = {0}
                            zIndex = {2}
                            rounded = 'md'
                            opacity = {.7}
                        />
                        
                        <Text color = 'gray.700' position = 'absolute' zIndex = {4} left = {2} top = {71} fontFamily = 'heading'> 
                            ANÚNCIO DESATIVADO 
                        </Text>
                    </>
                }
                <Image 
                    h = {24}
                    source = {{uri: `${api.defaults.baseURL}/images/${product.product_images[0].path}`}}
                    alt = 'Product image'
                    rounded = 'md'
                    borderColor = 'gray.200'
                />

                <Text fontSize = 'md' fontFamily = 'body' color = {product.is_active ? 'gray.300' : 'gray.400'} mt = {1}>
                    {product.name}
                </Text>

                <HStack alignItems = 'flex-end'>
                    <Heading fontFamily = 'heading' fontSize = 'sm'  color = {product.is_active ? 'gray.300' : 'gray.400'}>
                        R$   
                    </Heading>

                    <Heading fontFamily = 'heading' fontSize = 'lg' color = {product.is_active ? 'gray.300' : 'gray.400'} ml = {1}>
                        {(product.price / 100).toFixed(2).replace('.', ',')}
                    </Heading>
                </HStack>
            </VStack>

        </Pressable>
    )
}

export default AddProduct