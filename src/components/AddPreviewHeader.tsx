import { Center, Heading, Text } from "native-base"

const AddPreviewHeader = () => {
    return (
        <Center pt = {12} pb = {5} bgColor = 'blue.200'>
            <Heading fontFamily = 'heading' fontSize = 'lg' color = 'gray.700'>
                Pré visualização do anúncio
            </Heading>

            <Text fontFamily = 'body' fontSize = 'md' color = 'gray.700'>
                É assim que seu produto vai aparecer!
            </Text>
        </Center>
        
    )
}

export default AddPreviewHeader