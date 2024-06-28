import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Alert, Button } from 'react-native';
import style from '../style/Home';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const userIds = ['minim12', 'magna12', 'irure12', 'amet12', 'velit12'];

export default function Home() {
    const navigation = useNavigation();
    const [myId, setMyId] = useState<string>('velit12');

    const handlePressEnterBtn = useCallback(() => {
        if (userIds.includes(myId)) {
            AsyncStorage.setItem('myId', myId);
            navigation.navigate('ConversationList');
            return;
        }
        Alert.alert('invalid id');
    }, [myId]);

    return (
        <View style={style.container}>
            <View>
                <TextInput
                    placeholder="enter your ID"
                    value={myId}
                    onChangeText={(text) => setMyId(text)}
                ></TextInput>
                <Button title="Enter" onPress={handlePressEnterBtn}></Button>
            </View>
        </View>
    );
}
