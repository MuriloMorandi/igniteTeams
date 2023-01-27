import { Header } from "@components/Header";
import { Container, Content, Icon } from "./styles";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";


export function NewGroup() {
    const { navigate } = useNavigation();
    const [group, setGroup] = useState('')
    
    async function handleNew() {
        navigate('players', { group })
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