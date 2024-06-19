import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { getConversationListFromServer } from 'api/conversationApi';
import { Conversation } from 'utils/type';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import style from 'style/ConversationList';

export default function ConversationList() {
    const navigation = useNavigation();
    const [conversationList, setConversationList] = useState<Conversation[]>([]);

    useEffect(() => {
        getConversationListFromServer().then((conversations) =>
            setConversationList(conversations || []),
        );
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
                                source={{ uri: conversation.userAvatarUrl }}
                            ></Image>
                        </View>
                        <View>
                            <Text style={style.userName}>{conversation.userName}</Text>
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
