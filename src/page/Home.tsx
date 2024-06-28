import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, Button } from 'react-native';
import style from '../style/Home';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
    const [myId, setMyId] = useState<string>('');

    const handlePressEnterBtn = useCallback(() => {
        AsyncStorage.setItem('myId', myId);
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
