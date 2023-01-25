import { Container } from "@components/Loading/styles";
import { Message } from "./styles";

interface ListEmptyProps{
    message: string;
}


export function ListEmpty({ message }:ListEmptyProps) {
    return (
        <Container>
            <Message>
                {message}
            </Message>
        </Container>
    )
    
}