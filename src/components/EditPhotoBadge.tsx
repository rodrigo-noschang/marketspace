import { Box, Icon } from "native-base"
import { AntDesign } from '@expo/vector-icons';

const EditPhotoBadge = () => {
    return (
        <Box 
            w = {10} 
            h = {10} 
            bgColor = 'blue.200' 
            borderRadius = {20} 
            justifyContent = 'center' 
            alignItems = 'center'
            position = 'absolute'
            right = {-10}
            bottom = {0}
            >
            <Icon 
                as = {AntDesign}
                name = 'edit'
                size = {17}
                color = 'gray.500'
            />
        </Box>
    )
}

export default EditPhotoBadge