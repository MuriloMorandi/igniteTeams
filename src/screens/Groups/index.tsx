import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { Button } from "@components/Button";
import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ListEmpty } from "@components/ListEmpty";
import { Loading } from "@components/Loading";
import { groupsGetAll } from "@storage/groupsGetAll";

import { Container } from "./styles";

export function Groups() {
    const { navigate } = useNavigation();
    const [loading, setLoading] = useState(true);
    const [groups, setGroups] = useState<string[]>([])

    function handleNewGroup() {
        navigate('newGroup')
    }

    function handleOpenGroup(group: string) {
        navigate('players', { group })
    }

    async function fetchtGroups() {
        try{
            setLoading(true)
            
            const data = await groupsGetAll()
            
            setGroups(data);
        } catch (error) {
            console.log(error)
        } finally
        {
            setLoading(false)
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
            {loading ?
                <Loading/>
            :
                <>
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
                                message="Que tal cadastrar uma turma"
                            />
                        )}
                    />

                    <Button
                        title="Criar nova turma"
                        onPress={handleNewGroup}
                    />
                </>
            }
            
        </Container>        
    )
}