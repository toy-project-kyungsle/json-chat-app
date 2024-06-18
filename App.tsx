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
import { theme } from './colors';
import { getConversationListFromServer } from 'api/conversationApi';
import { Conversation } from 'utils/type';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bg,
        paddingHorizontal: 20,
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 5,
    },
    titleBox: {
        flexDirection: 'row',
    },
});

export default function App() {
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
                    style={{
                        backgroundColor: theme.grey,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 5,
                        marginBottom: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
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
                            <Text>{conversation.title}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}
