import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

const useMyId = () => {
    const [myId, setMyId] = useState<string>('');

    const getMyIdFromStorage = async () => {
        const myId = await AsyncStorage.getItem('myId');
        if (!myId) return;
        return myId;
    };

    const initHook = useCallback(async () => {
        const _myId = await getMyIdFromStorage();
        if (!_myId) return;
        setMyId(_myId);
    }, []);

    useEffect(() => {
        initHook();
    }, []);

    return { myId };
};

export default useMyId;
