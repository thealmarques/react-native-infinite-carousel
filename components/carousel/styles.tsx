import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    sliderContainer: {
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        height: 50,
    },
    slider: {
        marginLeft: 10,
        borderRadius: 20,
        width: 15,
        height: 15
    },
    selected: {
        backgroundColor: '#3A4750',
        zIndex: 100
    },
    notSelected: {
        backgroundColor: 'white',
        zIndex: 100
    },
    image: {
        position: 'absolute',
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    }
});