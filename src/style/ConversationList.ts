import { StyleSheet } from 'react-native';

const cardHeight = 80;
const imageSize = 60;
const commonMargin = 20;
const bdRadius = 5;

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: commonMargin,
        backgroundColor: '#FFE500',
    },
    conversationCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: cardHeight,
        marginBottom: commonMargin,
        padding: commonMargin,
        borderRadius: bdRadius,
        backgroundColor: '#fff',
    },
    userInfoView: {
        flexDirection: 'row',
        gap: 15,
    },
    convoView: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: imageSize,
    },
    userImage: {
        width: imageSize,
        height: imageSize,
        borderRadius: bdRadius,
    },
    userName: {
        fontWeight: 'bold',
    },
});

export default style;
