import { getChatListFromServer } from 'api/conversationApi';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { theme } from 'utils/colors';
import { Chat } from 'utils/type';

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bg,
    },
    text: {
        color: theme.grey,
    },
});

export default function ChatList({ route }: any) {
    const { conversationId } = route.params;
    const [emails, setEmails] = useState<Chat[]>([]);

    useEffect(() => {
        getChatListFromServer(conversationId).then((emails) => {
            console.log(emails);
            setEmails(emails);
        });
    }, [conversationId]);

    return (
        <ScrollView style={style.container}>
            {emails.map((email) => (
                <View key={email.id}>
                    <Text style={style.text}>{email.text}</Text>
                </View>
            ))}
        </ScrollView>
    );
}
