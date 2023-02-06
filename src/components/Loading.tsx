import { Center, Spinner } from 'native-base';

const Loading = () => {

    return (
        <Center flex = {1} bgColor = 'gray.700'>
            <Spinner size = {35} color = 'blue.200'/>
        </Center>
    )

}

export default Loading;