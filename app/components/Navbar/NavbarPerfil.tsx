import { Flex, Text } from "@chakra-ui/react"

interface NavbarPerfilProps {
    user: String
}

export default function NavbarPerfil({ user }: NavbarPerfilProps) {
    return (
        <Flex
            w='45px'
            h='45px'
            bg='#0066FF'
            borderRadius='22px'
            alignItems='center'
            justifyContent='center'>
            <Text
                fontSize='18px'
                color='white'>
                {user}
            </Text>
        </Flex>
    )
}