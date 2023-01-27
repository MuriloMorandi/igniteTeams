
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Groups } from '@screens/Groups';
import { NewGroup } from '@screens/NewGroup';
import { Players } from '@screens/Players';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                animation: "fade_from_bottom"
            }}
        >
            <Screen name="v" component={Groups} />
            <Screen name="players" component={Players} />
            <Screen name="newGroup" component={NewGroup} />
        </Navigator>
    )
}