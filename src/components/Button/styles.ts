import styled, { css } from "styled-components/native";

export type ButtonTypeStyleProps = "PRIMARY" | "SECONDARY";

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
    ${({ theme }) => css`
        font-size:${theme.FONT_SIZE.MD}px;
        color: ${theme.COLORS.WHITE};
        font-family: ${theme.FONT_FAMILY.BOLD};
    `}
`;