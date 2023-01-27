import { Header } from "@components/Header";
import { Container, Form } from "./styles";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { FlatList } from "react-native";
import { useState } from "react";
import { HeaderList, NumbersOfPlayers } from "@components/Filter/styles";


export function Players() {
    const [team, setTeam] = useState('time A');
    const [players, setPlayers] = useState(['Jorge', 'Matheus', 'Diego']);

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

        </Container>
    )
}