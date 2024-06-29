import AsyncStorage from '@react-native-async-storage/async-storage';

export const getMyIdFromStorage = async () => {
    const myId = await AsyncStorage.getItem('myId');
    if (!myId) return;
    return myId;
};
