import styled from "styled-components/native";

export type ButtonTypeStyleProps = 'PRIMARY' | 'SECONDARY'

interface  ButtonStyleProps{
    type: ButtonTypeStyleProps
}

export const Container = styled.TouchableOpacity<ButtonStyleProps>`
    flex: 1;
    min-height: 56px;
    max-height: 56px;border-radius: 6px;
    justify-content: center;
    align-items: center;

    background-color: ${({ theme, type }) => type === 'PRIMARY' ?
        theme.COLORS.GREEN_700
        :
        theme.COLORS.RED
    };
`;

export const Title = styled.Text`
    font-size:${({ theme }) => theme.FONT_SIZE.MD}px;
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;