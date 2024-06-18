import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Alert,
    ScrollView,
    Image,
} from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { theme } from 'utils/colors';
import { getConversationListFromServer } from 'api/conversationApi';
import { Conversation } from 'utils/type';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const styles = StyleSheet.create({
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
        // backgroundColor: theme.grey,
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

export default function ConversationList() {
    const navigation = useNavigation();
    const [conversationList, setConversationList] = useState<Conversation[]>([]);

    useEffect(() => {
        getConversationListFromServer().then((conversations) => {
            console.log(conversations);
            if (conversations) setConversationList(conversations);
        });
    }, []);

    return (
        <ScrollView style={styles.container}>
            {conversationList.map((conversation) => (
                <TouchableOpacity
                    key={conversation.id}
                    style={styles.conversationBox}
                    onPress={() => {
                        navigation.navigate('ChatList', { conversationId: conversation.id });
                    }}
                >
                    <View style={styles.titleBox}>
                        <View>
                            <Image
                                style={styles.image}
                                source={{ uri: conversation.userAvatarUrl }}
                            ></Image>
                        </View>
                        <View>
                            <Text style={styles.userName}>{conversation.userName}</Text>
                            <Text>{conversation.title}</Text>
                        </View>
                    </View>
                    <View>
                        <Text>{moment(conversation.updatedAt).format('hh:mm')}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}
