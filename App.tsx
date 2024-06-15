import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Alert,
    ScrollView,
} from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { theme } from './colors';
import { getConversationListFromServer } from 'api/conversationApi';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bg,
        paddingHorizontal: 20,
    },
});

export default function App() {
    // const [conversationList, setConversationList] = useState<Conversation[]>([]);

    useEffect(() => {
        getConversationListFromServer().then((conversations) => {
            console.log(conversations);
        });
    }, []);

    return <View style={styles.container}></View>;
}
