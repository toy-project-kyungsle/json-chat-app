import { getChatListFromServer, putChatByConversationId } from 'api/conversationApi';
import { useCallback, useEffect, useState } from 'react';
import { Button, Image, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { ChatType } from 'utils/type';
import style from 'style/ChatList';
import io from 'socket.io-client';
import uuid from 'react-native-uuid';

const DUMMUY_MY_ID = 'dummyMyId';
const newSocket = io('http://192.168.0.7:3000');

export default function ChatList({
    route,
}: {
    route: {
        params: { conversationId: string; userId: string; userName: string; userAvatarUrl: string };
    };
}) {
    const { conversationId, userId, userName, userAvatarUrl } = route.params;
    const [emails, setEmails] = useState<ChatType[]>([]);
    const [enteredText, setEnteredText] = useState<string>('');

    const handlePostChat = useCallback(async () => {
        const newId = uuid.v4() as string;
        const newCreatedAt = Date.now();
        const newProp = {
            id: newId,
            conversationId,
            text: enteredText,
            createdAt: newCreatedAt,
        };
        newSocket.emit('chat', { userId, userName, userAvatarUrl, conversationId });
        return await putChatByConversationId(newProp);
    }, [conversationId, enteredText]);

    const handlePressChatBtn = useCallback(async () => {
        if (enteredText === '') return;
        const postedChat = await handlePostChat();
        setEnteredText('');
        setEmails((emails) => [...emails, postedChat]);
    }, [conversationId, enteredText]);

    useEffect(() => {
        getChatListFromServer(conversationId).then((emails) => setEmails(emails));
    }, [conversationId]);

    useEffect(() => {
        newSocket.connect();
        newSocket.on('chat', (data) => {
            setEmails((emails) => [...emails, data]);
        });
        return () => {
            newSocket.off('chat');
            newSocket.disconnect();
        };
    }, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={style.container}
            keyboardVerticalOffset={90}
        >
            <ScrollView style={style.chatView}>
                {emails.map((email) => (
                    <View
                        key={email.id}
                        style={{
                            ...style.chatCard,
                            justifyContent:
                                email.userId === DUMMUY_MY_ID ? 'flex-end' : 'flex-start',
                        }}
                    >
                        {email.userId !== DUMMUY_MY_ID && (
                            <View>
                                <Image
                                    style={style.chatImage}
                                    source={{ uri: email.userAvatarUrl }}
                                ></Image>
                            </View>
                        )}
                        <View>
                            {email.userId !== DUMMUY_MY_ID && (
                                <Text style={style.counterUserName}>{email.userName}</Text>
                            )}
                            <View style={style.chatContent}>
                                <Text style={style.chatText}>{email.text}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <View style={style.InputView}>
                <TextInput
                    placeholder="Enter text here"
                    value={enteredText}
                    onChangeText={(text) => setEnteredText(text)}
                ></TextInput>
                <Button title="Send" onPress={handlePressChatBtn} />
            </View>
        </KeyboardAvoidingView>
    );
}
