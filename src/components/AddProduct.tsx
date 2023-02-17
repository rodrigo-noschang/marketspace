import { Pressable, IPressableProps, VStack, Image, Heading, Text, Badge, HStack } from 'native-base';

import { ProductAddDTO } from '@dtos/AddsDTO';
import api from '@services/api';

type Props = IPressableProps & {
    product: ProductAddDTO 
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

            <VStack>
                <Image 
                    h = {24}
                    source = {{uri: `${api.defaults.baseURL}/images/${product.product_images[0].path}`}}
                    alt = 'Product image'
                    rounded = 'md'
                    borderWidth = {1}
                    borderColor = 'gray.200'
                />

                <Text fontSize = 'md' fontFamily = 'body' color = {product.is_active ? 'gray.300' : 'gray.500'} mt = {1}>
                    {product.name}
                </Text>

                <HStack alignItems = 'flex-end'>
                    <Heading fontFamily = 'heading' fontSize = 'sm'  color = {product.is_active ? 'gray.300' : 'gray.500'}>
                        R$   
                    </Heading>

                    <Heading fontFamily = 'heading' fontSize = 'lg' color = 'gray.300' ml = {1}>
                        {(product.price / 100).toFixed(2).replace('.', ',')}
                    </Heading>
                </HStack>
            </VStack>

        </Pressable>
    )
}

export default AddProduct