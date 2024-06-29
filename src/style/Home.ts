import { StyleSheet } from 'react-native';
import { theme } from '../utils/colors';

const style = StyleSheet.create({
    container: {
        padding: 20,
    },
    guideText: {
        fontSize: 20,
        marginBottom: 40,
        textAlign: 'center',
    },
    button: {
        height: 50,
        borderRadius: 5,
        backgroundColor: theme.bg,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    userIdText: {},
});

export default style;
