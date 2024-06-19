import { StyleSheet } from 'react-native';
import { theme } from '../utils/colors';

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bg,
        paddingHorizontal: 10,
    },
    conversationCard: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftBox: {
        flexDirection: 'row',
        gap: 15,
    },
    userImage: {
        width: 60,
        height: 60,
        borderRadius: 5,
    },
    userName: {
        fontWeight: 'bold',
    },
});

export default style;
