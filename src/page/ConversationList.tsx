import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { getConversationListFromServer } from '../api/conversationApi';
import { ConversationType, UserType } from '../utils/type';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import style from '../style/ConversationList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import { getUserListFromServer } from '../api/userApi';

export default function ConversationList() {
    const navigation = useNavigation();
    const [conversationList, setConversationList] = useState<ConversationType[]>([]);
    const [myId, setMyId] = useState<string>('');
    const { data: userList } = useQuery({
        queryKey: ['userList'],
        queryFn: getUserListFromServer,
    });

    const getMyId = useCallback(async () => {
        const myId = await AsyncStorage.getItem('myId');
        if (!myId) return;
        return myId;
    }, []);

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
        const _myId = await getMyId();
        if (!_myId) return;
        setMyId(_myId);
        const conversationListFromServer = await getConversationListFromServer();
        if (!conversationListFromServer) return;
        const newConversationList = conversationListFromServer.filter(
            (conversation: ConversationType) => conversation.attendee.includes(_myId),
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
                        navigation.navigate('ChatList', {
                            conversationId: conversation.id,
                            userId: conversation.userId,
                            userName: conversation.userName,
                            userAvatarUrl: conversation.userAvatarUrl,
                        });
                    }}
                >
                    <View style={style.leftBox}>
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
                    <View>
                        <Text>{moment(conversation.updatedAt).format('hh:mm')}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}
