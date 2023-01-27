import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "./keys";
import { groupsGetAll } from "./groupsGetAll";
import { AppError } from "@utils/appError";

export async function groupCreate(newGroup:string) {
    try
    {
        newGroup = newGroup.trim();
        if (newGroup.length === 0)
        {
            throw new AppError("Informe o nome da turma");
        }

        const storedGroups = await groupsGetAll()
        
        const groupsAlreadyExists = storedGroups.includes(newGroup)

        if (groupsAlreadyExists){
            throw new AppError("Já existe um groupo cadastrado com esse nome.")
        }

        const storage = JSON.stringify([...storedGroups, newGroup])
        return await AsyncStorage.setItem(GROUP_COLLECTION, storage);

    } catch (error) {
        throw error;
    }
}

