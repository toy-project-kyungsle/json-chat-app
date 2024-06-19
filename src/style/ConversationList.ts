import { StyleSheet } from 'react-native';
import { theme } from 'utils/colors';

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bg,
        paddingHorizontal: 10,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 5,
    },
    conversationBox: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleBox: {
        flexDirection: 'row',
        gap: 15,
    },
    userName: {
        fontWeight: 'bold',
    },
});

export default style;
