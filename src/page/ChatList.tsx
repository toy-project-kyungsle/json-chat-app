import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { getAllChatInfoFromServer } from '../api/chatInfoApi';
import { ChatInfoType, UserType } from '../utils/type';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import style from '../style/ChatList';
import { useQuery } from '@tanstack/react-query';
import { getUserListFromServer } from '../api/userApi';
import { getMyIdFromStorage } from '../utils/function';

export default function ChatList() {
    const navigation = useNavigation();
    const [conversationList, setConversationList] = useState<ChatInfoType[]>([]);
    const [myId, setMyId] = useState<string>('');
    const { data: userList } = useQuery({
        queryKey: ['userList'],
        queryFn: getUserListFromServer,
    });

    const getUserInfoForList = useCallback(
        (attendee: string[]) => {
            if (!attendee || !userList) return;
            const targetId = attendee.find((id) => id !== myId);
            const targetUser = userList.find((user: UserType) => user.id === targetId);
            return targetUser;
        },
        [myId, userList],
    );

    const initComponent = useCallback(async () => {
        const _myId = await getMyIdFromStorage();
        if (!_myId) return;
        setMyId(_myId);
        const conversationListFromServer = await getAllChatInfoFromServer();
        console.log(conversationListFromServer);
        if (!conversationListFromServer) return;
        const newConversationList = conversationListFromServer.filter(
            (conversation: ChatInfoType) => conversation.attendee.includes(_myId),
        );
        setConversationList(newConversationList);
    }, []);

    useEffect(() => {
        initComponent();
    }, []);

    return (
        <ScrollView style={style.container}>
            {conversationList.map((conversation) => (
                <TouchableOpacity
                    key={conversation.id}
                    style={style.conversationCard}
                    onPress={() => {
                        navigation.navigate('ChatPage', {
                            chatInfoId: conversation.id,
                        });
                    }}
                >
                    <View style={style.userInfoView}>
                        <View>
                            <Image
                                style={style.userImage}
                                source={{
                                    uri: getUserInfoForList(conversation.attendee)?.avatarUrl,
                                }}
                            ></Image>
                        </View>
                        <View>
                            <Text style={style.userName}>
                                {getUserInfoForList(conversation.attendee)?.name}
                            </Text>
                        </View>
                    </View>
                    <View style={style.convoView}>
                        <Text>{moment(conversation.updatedAt).format('hh:mm')}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}
