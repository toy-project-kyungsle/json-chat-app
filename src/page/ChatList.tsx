import { getChatListFromServer, putConversationById } from 'api/conversationApi';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
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
    const [enteredText, setEnteredText] = useState<string>('');

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
            <View>
                <TextInput
                    placeholder="Enter text here"
                    value={enteredText}
                    onChangeText={(text) => setEnteredText(text)}
                ></TextInput>
                <Button
                    title="Send"
                    onPress={() => {
                        putConversationById({ conversationId, text: enteredText });
                        setEnteredText('');
                    }}
                />
            </View>
        </ScrollView>
    );
}
