import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'reducers';

import Styled from './Main.styled';

function Main() {
    const queryCache = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: false,
            },
        },
    });
    const store = createStore(rootReducer);

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryCache}>
                <Styled.Main>
                    <Styled.ConversationList />
                    <Styled.EmailArea />
                </Styled.Main>
            </QueryClientProvider>
        </Provider>
    );
}

export default Main;
