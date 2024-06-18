import { getChatListFromServer, putConversationById } from 'api/conversationApi';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { theme } from 'utils/colors';
import { Chat } from 'utils/type';

const style = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: theme.bg,
        height: '100%',
    },
    text: {
        color: theme.grey,
    },
    enterBox: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.toDoBg,
    },
});

export default function ChatList({ route }: any) {
    const { conversationId } = route.params;
    const [emails, setEmails] = useState<Chat[]>([]);
    const [enteredText, setEnteredText] = useState<string>('');

    useEffect(() => {
        getChatListFromServer(conversationId).then((emails) => setEmails(emails));
    }, [conversationId]);

    return (
        <View style={style.container}>
            <ScrollView>
                {emails.map((email) => (
                    <View key={email.id}>
                        <Text style={style.text}>{email.text}</Text>
                    </View>
                ))}
            </ScrollView>
            <View style={style.enterBox}>
                <TextInput
                    placeholder="Enter text here"
                    value={enteredText}
                    onChangeText={(text) => setEnteredText(text)}
                ></TextInput>
                <Button
                    title="Send"
                    onPress={() => {
                        if (enteredText === '') return;
                        putConversationById({ conversationId, text: enteredText });
                        setEnteredText('');
                        getChatListFromServer(conversationId).then((emails) => setEmails(emails));
                    }}
                />
            </View>
        </View>
    );
}
