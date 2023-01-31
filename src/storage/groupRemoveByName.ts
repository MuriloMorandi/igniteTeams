import AsyncStorage from "@react-native-async-storage/async-storage";
import { groupsGetAll } from "./groupsGetAll";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "./keys";


export async function groupRemoveByName(groupName: string) {
    try {
        const storageGroup = await groupsGetAll()
        
        const groupsFiltered = storageGroup
            .filter(group => group !== groupName)
        
        const groups = JSON.stringify(groupsFiltered);
        await AsyncStorage.setItem(GROUP_COLLECTION, groups)

        await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupName}`)

    } catch (error) {
        throw error
    }
}