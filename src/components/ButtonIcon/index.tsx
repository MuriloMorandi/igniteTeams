import { TouchableOpacityProps } from "react-native";
import  { MaterialIcons } from '@expo/vector-icons'
import { ButtonIconTypeStyleProps, Container, Icon } from "./styles";

interface ButtonIconProps extends TouchableOpacityProps {
    type: ButtonIconTypeStyleProps;
    nameIcon: keyof typeof MaterialIcons.glyphMap;
}


export function ButtonIcon({ type, nameIcon, ...rest } : ButtonIconProps) {
    return (
        <Container type={type} {...rest}>
            <Icon type={type} name={nameIcon} />
        </Container>
    )
}