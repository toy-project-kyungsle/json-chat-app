import { Button, Image, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import style from '../style/ChatPage';
import useChatComponent from '../hook/useChatPageComponent';

export default function Chat({
    route,
}: {
    route: {
        params: { chatInfoId: string };
    };
}) {
    const { myId, chats, enteredText, counterUser, setEnteredText, handlePressChatBtn } =
        useChatComponent(route.params.chatInfoId);

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
