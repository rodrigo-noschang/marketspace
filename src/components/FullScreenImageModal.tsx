import { useEffect, useState, useRef, createRef } from 'react';
import { Image, Animated, Dimensions, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Box, Pressable, Icon, StatusBar} from 'native-base';
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';

import api from '@services/api';

type Props = {
    imagePath: string,
    setIsImageModalOpen: (isOpen: boolean) => void
}

const FullScreenImageModal = ({ imagePath, setIsImageModalOpen }: Props) => {
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
        },
    }], {
        listener: e => console.log('Evento aqui -> ', e.nativeEvent),
        useNativeDriver: true,
    })

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
        Image.getSize(`${api.defaults.baseURL}/images/${imagePath}`, 
            (w, h) => resizeImage(w, h), 
            () => {
                console.log('Erro ao ler a imagem')
        })
    }

    useEffect(() => {
        getImageSize();
    }, [])

    return (
        <View style = {{
            marginTop: -40,
            width: '100%', 
            height: '110%',
            backgroundColor: '#1A181B',
            zIndex: 5
        }}>
            <StatusBar hidden = {true} backgroundColor = '#1A181B'/>
            <PanGestureHandler
                onGestureEvent = {onPanEvent}
                ref = {panRef}
                simultaneousHandlers = {[pinchRef]}
                enabled = {panEnabled}
                failOffsetX = {[-1000, 1000]}
                shouldCancelWhenOutside
            >
                <Animated.View>
                    <Pressable onPress = {() => setIsImageModalOpen(false)} >
                        <Icon
                            as = {AntDesign}
                            name = 'close'
                            size = {6}
                            color = 'gray.600'
                            alignSelf = 'flex-end'
                            mt = {8}
                            mr = {4}
                            mb = {24}
                        />
                    </Pressable>

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
                </Animated.View>
            </PanGestureHandler>
        </View>
    )
}

export default FullScreenImageModal;