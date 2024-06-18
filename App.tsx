import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ConversationList from 'page/ConversationList';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={ConversationList} />
                {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
