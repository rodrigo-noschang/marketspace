import { extendTheme } from 'native-base';

export const THEME = extendTheme({
    colors: {
        gray: {
            100: '#1A181B',
            200: '#3E3A40',
            300: '#5F5B62',
            400: '#9F9BA1',
            500: '#D9D8DA',
            600: '#EDECEE',
            700: '#F7F7F8'
        },
        blue: {
            100: '#364D9D',
            200: '#647AC7',
            300: 'rgba(100, 122, 199, .25)',
            400: 'rgba(100, 122, 199, .35)'
        },
        red: {
            100: '#EE7979'
        },
        green: {
            100: '#0a0'
        }
    },
    fontSizes: {
        xs: 10,
        sm: 12,
        md: 14,
        lg: 16,
        xl: 20
    },
    fonts: {
        body: 'Karla_400Regular',
        heading: 'Karla_700Bold'
    }
})