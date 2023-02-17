import { Pressable, IPressableProps, VStack, Image, Heading, Text, Badge, HStack } from 'native-base';

import { ProductAddDTO } from '@dtos/AddsDTO';
import api from '@services/api';

type Props = IPressableProps & {
    product: ProductAddDTO 
}

const AddProduct = ({ product, ...rest }: Props) => {

    return (
        <Pressable w = '47%' {...rest} mt = {5}>
            <VStack>
                <Image 
                    h = {24}
                    source = {{uri: `${api.defaults.baseURL}/images/${product.product_images[0].path}`}}
                    alt = 'Product image'
                    rounded = 'md'
                    borderWidth = {1}
                    borderColor = 'gray.200'
                />

                <Text fontSize = 'md' fontFamily = 'body' color = 'gray.300' mt = {1}>
                    {product.name}
                </Text>

                <HStack alignItems = 'flex-end'>
                    <Heading fontFamily = 'heading' fontSize = 'sm' color = 'gray.300'>
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