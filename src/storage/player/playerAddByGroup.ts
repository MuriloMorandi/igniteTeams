import AsyncStorage from "@react-native-async-storage/async-storage";
import { playerGetAllByGroup } from "./playerGetAllByGroup";
import { PlayerStorageDTO } from "./playerStorageDTO";
import { PLAYER_COLLECTION } from "@storage/keys";
import { AppError } from "@utils/appError";

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
    
    try {
        const storagePlayer = await playerGetAllByGroup(group);
        
        const playerAlreadyExists = storagePlayer
            .filter(player => player.name === newPlayer.name);
        
        if(playerAlreadyExists.length === 1){
            throw new AppError("Essa pesssoa já está adicionada em um time aqui.")
        }   

        const storage = JSON.stringify([...storagePlayer, newPlayer]);

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
    } catch (error) {
        throw(error)
    }
}