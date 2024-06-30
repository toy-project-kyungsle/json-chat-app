import { getMyIdFromStorage } from '../utils/function';
import { useCallback, useEffect, useState } from 'react';

const useMyId = () => {
    const [myId, setMyId] = useState<string>('');

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
