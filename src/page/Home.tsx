import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Alert, Button } from 'react-native';
import style from '../style/Home';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const userIds = ['minim12', 'magna12', 'irure12', 'amet12', 'velit12'];

export default function Home() {
    const [myId, setMyId] = useState<string>('velit12');

    const handlePressEnterBtn = useCallback(() => {
        if (userIds.includes(myId)) {
            AsyncStorage.setItem('myId', myId);
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
