import { Center, Spinner } from 'native-base';

type Props = {
    bgColor?: string
}

const Loading = ({ bgColor }: Props) => {

    return (
        <Center flex = {1} bgColor = {bgColor ?? 'gray.700'}>
            <Spinner size = {35} color = 'blue.200'/>
        </Center>
    )

}

export default Loading;