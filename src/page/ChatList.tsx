import { getChatListFromServer, putConversationById } from 'api/conversationApi';
import { useCallback, useEffect, useState } from 'react';
import { Button, Image, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Chat } from 'utils/type';
import { LoremIpsum } from 'lorem-ipsum';
import style from 'style/ChatList';
import io from 'socket.io-client';

const DUMMUY_MY_ID = 'dummyMyId';
const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4,
    },
    wordsPerSentence: {
        max: 16,
        min: 4,
    },
});
const newSocket = io('http://192.168.0.7:3000');

export default function ChatList({ route }: any) {
    const { conversationId, userId, userName, userAvatarUrl } = route.params;
    const [emails, setEmails] = useState<Chat[]>([]);
    const [enteredText, setEnteredText] = useState<string>('');

    const handleResponse = useCallback(async () => {
        const resSentence = lorem.generateSentences(3);
        return await putConversationById({
            conversationId,
            text: resSentence,
            userId,
            userName,
            userAvatarUrl,
        });
    }, [conversationId, userId, userName, userAvatarUrl]);

    const handlePostChat = useCallback(async () => {
        return await putConversationById({ conversationId, text: enteredText });
    }, [conversationId, enteredText]);

    const handlePressChatBtn = useCallback(async () => {
        if (enteredText === '') return;
        const postedChat = await handlePostChat();
        const responseChat = await handleResponse();
        setEnteredText('');
        setEmails((emails) => [...emails, postedChat, responseChat]);
    }, [conversationId, enteredText, handleResponse]);

    useEffect(() => {
        getChatListFromServer(conversationId).then((emails) => setEmails(emails));
    }, [conversationId]);

    useEffect(() => {
        return () => {
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
