import { Button, Image, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import style from '../style/ChatPage';
import useChat from '../hook/useChat';
import useMyId from '../hook/useMyId';
import useUser from '../hook/useUser';
import { useQuery } from '@tanstack/react-query';
import { ChatInfoType } from '../utils/type';
import { getChatInfoByIdFromServer } from '../api/chatInfoApi';
import { useMemo } from 'react';

export default function Chat({
    route,
}: {
    route: {
        params: { chatInfoId: string };
    };
}) {
    const chatInfoId = route.params.chatInfoId;
    const { myId } = useMyId();
    const { getCounterUser } = useUser();
    const { chats, enteredText, onChangeChatText, handlePressChatBtn } = useChat(chatInfoId);
    const { data: targetChatInfo } = useQuery<ChatInfoType>({
        queryKey: [`chatInfo-${chatInfoId}`],
        queryFn: () => getChatInfoByIdFromServer(chatInfoId),
    });
    const counterUser = useMemo(
        () => getCounterUser(targetChatInfo),
        [targetChatInfo, getCounterUser],
    );

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
                    onChangeText={onChangeChatText}
                    style={style.textInput}
                ></TextInput>
                <Button title="Send" onPress={handlePressChatBtn} />
            </View>
        </KeyboardAvoidingView>
    );
}
