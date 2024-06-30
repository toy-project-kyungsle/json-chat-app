import React, { useCallback } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import style from '../style/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { getUserListFromServer } from '../api/userApi';
import { UserType } from '../utils/type';

export default function Home() {
    const navigation = useNavigation();
    const { data: userList } = useQuery({
        queryKey: ['userList'],
        queryFn: getUserListFromServer,
    });

    const handlePressBtn = useCallback((user: UserType) => {
        AsyncStorage.setItem('myId', user.id);
        navigation.navigate('ChatList');
    }, []);

    return (
        <View style={style.container}>
            <Text style={style.guideText}>Press Your ID!</Text>
            {userList?.map((user: UserType) => (
                <TouchableOpacity onPress={() => handlePressBtn(user)} style={style.button}>
                    <View>
                        <Text>{user.id}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
}
