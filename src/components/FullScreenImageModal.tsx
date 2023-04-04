import { useEffect, useState, useRef, createRef } from 'react';
import { Image as RNImage, Animated, Dimensions } from 'react-native';
import { Box, Pressable, Icon} from 'native-base';
import { AntDesign } from '@expo/vector-icons';

import api from '@services/api';
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';

type Props = {
    imagePath: string
}

const FullScreenImageModal = ({ imagePath }: Props) => {
    const [panEnabled, setPanEnabled] = useState(false);
    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);

    const scale = useRef(new Animated.Value(1)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;

    const pinchRef = createRef();
    const panRef = createRef();

    const onPinchEvent = Animated.event([{
        nativeEvent: { scale }
    }], {useNativeDriver: true});

    const onPanEvent = Animated.event([{
        nativeEvent: {
            translationX: translateX,
            translationY: translateY
        }
    }], {useNativeDriver: true})

    const handlePinchStateChange = ({ nativeEvent }: any) => {
        // enabled pan only after pinch-zoom
        if (nativeEvent.state === State.ACTIVE) {
          setPanEnabled(true);
        }
    
        // when scale < 1, reset scale back to original (1)
        const nScale = nativeEvent.scale;
        if (nativeEvent.state === State.END) {
          if (nScale < 1) {
            Animated.spring(scale, {
              toValue: 1,
              useNativeDriver: true
            }).start();
            Animated.spring(translateX, {
              toValue: 0,
              useNativeDriver: true
            }).start();
            Animated.spring(translateY, {
              toValue: 0,
              useNativeDriver: true
            }).start();
    
            setPanEnabled(false);
          }
        }
    };

    const resizeImage = (imageWidth: number, imageHeight: number) => {
        const {width, height} = Dimensions.get('window');

        const widthProportion = width / imageWidth;
        const proprotionalHeight = imageHeight * widthProportion;
        
        const newHeight = proprotionalHeight > height ? height : proprotionalHeight;
        setImageWidth(width);
        setImageHeight(newHeight);
    }

    const getImageSize = () => {
        RNImage.getSize(`${api.defaults.baseURL}/images/${imagePath}`, 
        (w, h) => resizeImage(w, h), 
        () => {
            console.log('Erro ao ler a imagem')
        })
    }

    useEffect(() => {
        getImageSize();
    }, [])

    return (
        <Box position = 'absolute' top = {0} left = {0} w = '100%' h = '110%' bgColor = 'gray.200' zIndex = {5}>
            <PanGestureHandler
                onGestureEvent = {onPanEvent}
                ref = {panRef}
                simultaneousHandlers = {[pinchRef]}
                enabled = {panEnabled}
                failOffsetX = {[-1000, 1000]}
                shouldCancelWhenOutside
            >
                <Animated.View>
                    {/* <Icon
                        as = {AntDesign}
                        name = 'close'
                        size = {6}
                        color = 'gray.600'
                        alignSelf = 'flex-end'
                        mt = {4}
                        mr = {4}
                    /> */}

                    {/* <Animated.View> */}
                        <PinchGestureHandler
                            ref = {pinchRef}
                            onGestureEvent = {onPinchEvent}
                            simultaneousHandlers = {[panRef]}
                            onHandlerStateChange = {handlePinchStateChange}
                        >
                            <Animated.Image 
                                source = {{uri: `${api.defaults.baseURL}/images/${imagePath}`}}
                                style = {{
                                    width: imageWidth,
                                    height: imageHeight,
                                    transform: [{ scale }, {translateX}, {translateY}]
                                }}
                                resizeMode = 'contain'
                            />
                        </PinchGestureHandler>
                    {/* </Animated.View> */}
                </Animated.View>
            </PanGestureHandler>
        </Box>
    )
}

export default FullScreenImageModal;