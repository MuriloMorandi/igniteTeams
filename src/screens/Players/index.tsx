import { Alert, FlatList, TextInput } from "react-native";
import { useEffect, useState, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ListEmpty } from "@components/ListEmpty";
import { Loading } from "@components/Loading";
import { PlayerCard } from "@components/PlayerCard";

import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerGetAllByGroupAndTime } from "@storage/player/playerGetAllByGroupAndTeam";
import { playerRemoveBygroup } from "@storage/player/playerRemoveByGroup";
import { PlayerStorageDTO } from "@storage/player/playerStorageDTO";
import { groupRemoveByName } from "@storage/groupRemoveByName";

import { AppError } from "@utils/appError";

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";

type RouteParam = {
    group: string;
}

export function Players() {
    const { navigate } = useNavigation()
    const route = useRoute()
    const { group } = route.params as RouteParam;

    const [loading, setLoading] = useState(true);
    const [team, setTeam] = useState('time A');
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
    const [newPlayerName, setNewPlayerName] = useState('');

    const newPlayerNameInputRef = useRef<TextInput>(null);

    async function handleAddPlayer() {
        
        if (!newPlayerName.trim().length ){
            return Alert.alert('Nona pessoa', 'Informe o nome da pessoa para adicionar.')
        }

        const newPlayer = {
            name: newPlayerName,
            team
        }

        try {
            await playerAddByGroup(newPlayer, group);
            
            newPlayerNameInputRef.current?.blur()
            
            setNewPlayerName('')
            
            fetchPlayersByGroupAndTime()
        } catch (error) {
            if (error instanceof AppError){
                Alert.alert('Nova Pessoa', error.message);
            }
            else
            {
                console.log(error);
                Alert.alert('Nova Pessoa', 'Não foi possível adicionar.');
            }
        }

    }

    async function handleRemovePlayer(playerName: string) {
        try{
            await playerRemoveBygroup(playerName, group);
            fetchPlayersByGroupAndTime()
        } catch (error){
            console.log(error);
            Alert.alert("Remover pessoa", "Não foi possivel remover essa pessoa.")

        }
        
    }

    async function groupRemove() {
        try {
            await groupRemoveByName(group);
            navigate('groups');

        } catch (error){
            console.log(error);
            Alert.alert('Remover Turma', 'Não foi possivel remove a turma');
        }
    }

    async function handleGroupRemove() {
        Alert.alert(
            'Remover',
            'Deseja remover a turma?',
            [
                {text: 'Não', style: 'cancel' },
                {text: 'Sim', onPress: () =>  groupRemove()}
            ]
        )
    }

    async function fetchPlayersByGroupAndTime() {
        try
        {
            setLoading(true)
            const playerByTeam = await playerGetAllByGroupAndTime(group, team)
            setPlayers(playerByTeam)
        } catch (error) {
            console.log(error)
            Alert.alert('Pessoas', 'Não foi possivel carregar as pessoas do time selecionadao')
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        fetchPlayersByGroupAndTime()
    }, [team, setPlayers]);

    return (
        <Container>
            <Header showBackButton />
            
            <Highlight
                title={group}
                subTitle="Adicione a galera e separe os times"
            />

            <Form>
                <Input
                    inputRef={newPlayerNameInputRef}
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                    onChangeText={setNewPlayerName}
                    value={newPlayerName}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
                />
                
                <ButtonIcon
                    nameIcon="add"
                    type="PRIMARY"
                    onPress={handleAddPlayer}
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
            
            {loading ?
                <Loading/>
            :
                <>
                    <FlatList
                        data={players}
                        keyExtractor={item => item.name}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <PlayerCard
                                name={item.name}
                                onRemove={()=> handleRemovePlayer(item.name)} />
                        )}
                        ListEmptyComponent={() => (
                            <ListEmpty message="Não existem pessoas nesse time"/>
                        )}
                        contentContainerStyle={[
                            { paddingBottom: 100 },
                            !players.length && { flex: 1 } 
                        ]}
                    />

                    <Button
                        title="Remover Turma"
                        type="SECONDARY"
                        onPress={handleGroupRemove}
                    />
                </>
            }

        </Container>
    )
}