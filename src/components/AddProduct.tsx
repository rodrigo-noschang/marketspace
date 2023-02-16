import { Pressable, IPressableProps, VStack, Image, Heading, Text, Badge } from 'native-base';

import { ProductAddDTO } from '@dtos/AddsDTO';
import api from '@services/api';

type Props = IPressableProps & {
    product: ProductAddDTO 
}

const AddProduct = ({ product, ...rest }: Props) => {

    console.log('AddProduct | Image path -> ', `${api.defaults.baseURL}/products/images/${product.product_images[0].path}`);

    return (
        <Pressable w = '48%' {...rest}>
            <Image 
                w = '100%'
                h = {20}
                source = {{uri: `${api.defaults.baseURL}/products/images/${product.product_images[0].path}`}}
                alt = 'Product image'
            />

        </Pressable>
    )
}

export default AddProduct