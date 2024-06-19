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
    chatCard: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 10,
    },
    chatContent: {
        maxWidth: 250,
        padding: 20,
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    chatText: {
        color: theme.grey,
    },
    counterUserName: {
        fontWeight: 'bold',
    },
    chatImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    InputView: {
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
