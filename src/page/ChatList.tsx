import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
    const [myId, setMyId] = useState<string>('');
    const { data: userList } = useQuery<UserType[]>({
        queryKey: ['userList'],
        queryFn: getUserListFromServer,
    });
    const { data: chatInfoFromServer } = useQuery<ChatInfoType[]>({
        queryKey: ['chatInfo', myId],
        queryFn: getAllChatInfoFromServer,
    });
    const chatInfoForMe = useMemo(() => {
        if (!chatInfoFromServer) return;
        return chatInfoFromServer.filter((chatInfo: ChatInfoType) =>
            chatInfo.attendee.includes(myId),
        );
    }, [chatInfoFromServer, myId]);

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
    }, []);

    useEffect(() => {
        initComponent();
    }, []);

    return (
        <ScrollView style={style.container}>
            {chatInfoForMe?.map((info) => (
                <TouchableOpacity
                    key={info.id}
                    style={style.conversationCard}
                    onPress={() => {
                        navigation.navigate('ChatPage', {
                            chatInfoId: info.id,
                        });
                    }}
                >
                    <View style={style.userInfoView}>
                        <View>
                            <Image
                                style={style.userImage}
                                source={{
                                    uri: getUserInfoForList(info.attendee)?.avatarUrl,
                                }}
                            ></Image>
                        </View>
                        <View>
                            <Text style={style.userName}>
                                {getUserInfoForList(info.attendee)?.name}
                            </Text>
                        </View>
                    </View>
                    <View style={style.convoView}>
                        <Text>{moment(info.updatedAt).format('hh:mm')}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}
