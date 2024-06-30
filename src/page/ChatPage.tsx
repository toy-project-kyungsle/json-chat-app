import { useCallback, useEffect, useState } from 'react';
import { Alert, Button, Image, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { ChatInfoType, ChatType, UserType } from '../utils/type';
import style from '../style/ChatPage';
import io from 'socket.io-client';
import { getAllChatByIdFromServer, putChatByInfoId } from '../api/chatApi';
import { useQuery } from '@tanstack/react-query';
import { getUserListFromServer } from '../api/userApi';
import { getMyIdFromStorage } from '../utils/function';
import { getChatInfoByIdFromServer } from '../api/chatInfoApi';
import useMyId from '../hook/useMyId';

const newSocket = io('http://192.168.0.7:3000');

export default function Chat({
    route,
}: {
    route: {
        params: { chatInfoId: string };
    };
}) {
    const { chatInfoId } = route.params;
    const { myId } = useMyId();
    const [chats, setChats] = useState<ChatType[]>([]);
    const [enteredText, setEnteredText] = useState<string>('');
    const { data: userList } = useQuery<UserType[]>({
        queryKey: ['userList'],
        queryFn: getUserListFromServer,
    });
    const { data: targetChatInfo } = useQuery<ChatInfoType>({
        queryKey: [`conversation-${chatInfoId}`],
        queryFn: () => getChatInfoByIdFromServer(chatInfoId),
    });
    const [counterUser, setCounterUser] = useState<UserType | null>(null);

    const handlePostChat = useCallback(async () => {
        if (!counterUser) return;
        const newProp = {
            infoId: chatInfoId,
            text: enteredText,
            userId: myId,
        };
        return await putChatByInfoId(newProp);
    }, [enteredText, myId, counterUser, chatInfoId]);

    const syncChatStateWithServer = useCallback(async () => {
        const _emails = await getAllChatByIdFromServer(chatInfoId);
        setChats(_emails);
    }, [chatInfoId]);

    const handlePressChatBtn = useCallback(async () => {
        if (enteredText === '') return;
        await handlePostChat();
        newSocket.emit('chat', { id: chatInfoId });
        setEnteredText('');
    }, [enteredText, handlePostChat]);

    useEffect(() => {
        if (!targetChatInfo || !myId || !userList) return;
        const _attendee = targetChatInfo.attendee;
        const _counterUserId = _attendee.find((userId: string) => userId !== myId);
        const _counterUser = userList.find((user: UserType) => user.id === _counterUserId);
        if (!_counterUser) return;
        setCounterUser(_counterUser);
    }, [targetChatInfo, userList, myId]);

    useEffect(() => {
        newSocket.connect();
        newSocket.on(`chat-${chatInfoId}`, () => {
            syncChatStateWithServer();
        });
        return () => {
            newSocket.off(`chat-${chatInfoId}`);
            newSocket.disconnect();
        };
    }, [chatInfoId]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={style.container}
            keyboardVerticalOffset={90}
        >
            <ScrollView style={style.chatScrollView}>
                {chats.map((chat) => (
                    <View
                        key={chat.id}
                        style={{
                            ...style.chatCard,
                            justifyContent: chat.userId === myId ? 'flex-end' : 'flex-start',
                        }}
                    >
                        {chat.userId !== myId && counterUser && (
                            <View>
                                <Image
                                    style={style.chatImage}
                                    source={{ uri: counterUser.avatarUrl }}
                                ></Image>
                            </View>
                        )}
                        <View>
                            {chat.userId !== myId && counterUser && (
                                <Text style={style.counterUserName}>{counterUser.name}</Text>
                            )}
                            <View style={style.chatContent}>
                                <Text style={style.chatText}>{chat.text}</Text>
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
                    style={style.textInput}
                ></TextInput>
                <Button title="Send" onPress={handlePressChatBtn} />
            </View>
        </KeyboardAvoidingView>
    );
}
