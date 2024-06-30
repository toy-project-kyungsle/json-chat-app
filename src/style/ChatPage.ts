import { StyleSheet } from 'react-native';

const commonMargin = 20;
const imageSize = 60;

const style = StyleSheet.create({
    container: {
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
    },
    chatScrollView: {
        paddingHorizontal: commonMargin,
        backgroundColor: '#FFE500',
    },
    chatCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        width: '100%',
        marginTop: commonMargin,
    },
    chatContent: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        maxWidth: 250,
        padding: commonMargin,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    chatText: {
        color: '#3A3D40',
    },
    counterUserName: {
        fontWeight: 'bold',
    },
    chatImage: {
        width: imageSize,
        height: imageSize,
        borderRadius: 10,
    },
    InputView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: imageSize,
        paddingHorizontal: commonMargin,
        backgroundColor: '#fff',
    },
    textInput: {
        flex: 1,
        height: '100%',
    },
});

export default style;
