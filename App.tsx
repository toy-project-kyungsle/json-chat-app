import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatPage from './src/page/ChatPage';
import ChatList from './src/page/ChatList';
import Home from './src/page/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Stack = createStackNavigator();
const queryClient = new QueryClient();

export default function App() {
    return (
        <NavigationContainer>
            <QueryClientProvider client={queryClient}>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="ChatList" component={ChatList} />
                    <Stack.Screen name="ChatPage" component={ChatPage} />
                </Stack.Navigator>
            </QueryClientProvider>
        </NavigationContainer>
    );
}
