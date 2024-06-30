import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import style from '../style/ChatList';
import useUser from '../hook/useUser';
import useChatInfo from '../hook/useChatInfo';

export default function ChatList() {
    const navigation = useNavigation();
    const { getCounterUser } = useUser();
    const { myChatInfo } = useChatInfo();

    return (
        <ScrollView style={style.container}>
            {myChatInfo?.map((info) => (
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
                                    uri: getCounterUser(info)?.avatarUrl,
                                }}
                            ></Image>
                        </View>
                        <View>
                            <Text style={style.userName}>{getCounterUser(info)?.name}</Text>
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
