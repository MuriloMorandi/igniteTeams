import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { Button } from "@components/Button";
import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ListEmpty } from "@components/ListEmpty";
import { groupsGetAll } from "@storage/groupsGetAll";

import { Container } from "./styles";

export function Groups() {
    const { navigate } = useNavigation();
    const [groups, setGroups] = useState<string[]>([])

    function handleNewGroup() {
        navigate('newGroup')
    }

    function handleOpenGroup(group: string) {
        navigate('players', { group })
    }

    async function fetchtGroups() {
        try {
            const data = await groupsGetAll()
            setGroups(data);
            
        } catch (error) {
            console.log(error)
        }
    }

    useFocusEffect(useCallback(() => {
        fetchtGroups()
    }, []));

    return (
        <Container>
            <Header />
            
            <Highlight
                title="Turmas"
                subTitle="jogue com a sua turma"
            />

            <FlatList
                data={groups}
                renderItem={({ item }) => (
                    <GroupCard
                        title={item}
                        onPress={()=>handleOpenGroup(item)}
                    />
                )}
                keyExtractor={item => item}
                contentContainerStyle={!groups.length && {flex:1}}
                ListEmptyComponent={() => (
                    <ListEmpty
                        message="Que tal cadastrar um groupo"
                    />
                )}
            />

            <Button
                title="Criar nova turma"
                onPress={handleNewGroup}
            />
        </Container>        
    )
}