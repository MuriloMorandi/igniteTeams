import { useState } from "react";
import { FlatList } from "react-native";

import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ListEmpty } from "@components/ListEmpty";

import { Container } from "./styles";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";

export function Groups() {
    const { navigate } = useNavigation();
    const [groups, setGroups] = useState<string[]>(['Galera da Diretoria', '4teto'])


    function handleNewGroups() {
        navigate('newGroup')
    }

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
                    <GroupCard title={item} />
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
                onPress={handleNewGroups}
            />
        </Container>        
    )
}