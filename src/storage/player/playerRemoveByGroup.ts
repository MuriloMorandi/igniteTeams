import AsyncStorage from "@react-native-async-storage/async-storage";
import { playerGetAllByGroup } from "./playerGetAllByGroup";
import { PLAYER_COLLECTION } from "@storage/keys";

export async function playerRemoveBygroup(playerName:string, group: string) {
    try
    {
        console.log(playerName)
        const storage = await playerGetAllByGroup(group);

        const playerFiltered = storage
            .filter(player => player.name !== playerName);
        
        const player = JSON.stringify(playerFiltered);
        
        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, player)
    } catch (error) {
        throw error
    }
}