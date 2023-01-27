import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { groupCreate } from "@storage/groupCreate";

import { Container, Content, Icon } from "./styles";
import { AppError } from "@utils/appError";
import { Alert } from "react-native";

export function NewGroup() {
    const { navigate } = useNavigation();
    const [group, setGroup] = useState('')
    
    async function handleNew() {
        try {
            await groupCreate(group);
            navigate('players', { group })
        } catch (error) {
            if (error instanceof AppError)
            {
                Alert.alert('Novo Grupo', error.message)
            }
            else
            {
                Alert.alert("Novo Groupo", "Não foi possivel  criar um novo groupo");
                console.log(error)
            }

        }
    }

    return (
        <Container>
            <Header showBackButton />
            <Content>
                <Icon />

                <Highlight
                    title="Nova turma" subTitle="crie a turma para adicionar as pessoas"
                />
                
                <Input
                    placeholder="Nome da turma"
                    onChangeText={setGroup}
                    value={group}
                />
                
                <Button
                    title="Criar"
                    style={{ marginTop: 20 }}
                    onPress={handleNew}
                />
                
            </Content>
        </Container>
    )
}