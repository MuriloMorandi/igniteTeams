import { FlatList } from "react-native";
import { useState } from "react";

import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ListEmpty } from "@components/ListEmpty";
import { PlayerCard } from "@components/PlayerCard";

import { Container, Form, HeaderList, NumbersOfPlayers }  from "./styles";
import { Button } from "@components/Button";

export function Players() {
    const [team, setTeam] = useState('time A');
    const [players, setPlayers] = useState(['Jorge', 'Matheus', 'Diego', 'Matheuse', 'casa', 'marcia', 'Marcos']);

    return (
        <Container>
            <Header showBackButton />
            
            <Highlight
                title="Nome da Turma"
                subTitle="Adicione a galera e separe os times"
            />

            <Form>
                <Input
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                />
                
                <ButtonIcon
                    nameIcon="add"
                    type="PRIMARY"
                />
            </Form>

            <HeaderList>
                <FlatList
                    data={['time A', 'time b', 'time C']}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter
                        title={item}
                        isActive={item === team}
                        onPress={() => setTeam(item)}
                        />
                        )}
                        horizontal
                />

                <NumbersOfPlayers>
                    {players.length}
                </NumbersOfPlayers>
            </HeaderList>
            
            <FlatList
                data={players}
                keyExtractor={item => item}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <PlayerCard name={item} onRemove={()=>{}}/>
                )}
                ListEmptyComponent={() => (
                    <ListEmpty message="Não existem pessoas nesse time"/>
                )}
                contentContainerStyle={[
                    { paddingBottom: 100 },
                    !players.length && { flex: 1 } 
                ]}
            />
            
            <Button title="Remover Turma" type="SECONDARY"/>

        </Container>
    )
}