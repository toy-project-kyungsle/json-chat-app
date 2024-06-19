import { StyleSheet } from 'react-native';
import { theme } from 'utils/colors';

const style = StyleSheet.create({
    container: {
        position: 'relative',
        backgroundColor: theme.bg,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    chatView: {
        paddingHorizontal: 20,
        backgroundColor: 'yellow',
    },
    chatContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 10,
    },
    chatBox: {
        maxWidth: 250,
        padding: 20,
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    text: {
        color: theme.grey,
    },
    userName: {
        fontWeight: 'bold',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    enterBox: {
        width: '100%',
        height: 70,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});

export default style;
