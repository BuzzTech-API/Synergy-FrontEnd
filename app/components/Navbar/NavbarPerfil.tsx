'use client'

import { Flex, Text } from "@chakra-ui/react"
import { useSession } from "next-auth/react"


export default function NavbarPerfil() {
    const { data: session } = useSession();

    if (session && session.user)
        return (
            <Flex
                w='45px'
                h='45px'
                bg='#0066FF'
                borderRadius='22px'
                alignItems='center'
                justifyContent='center'>
                <Text
                    fontSize='1.3rem'
                    color='white'>
                    {session.user.user_name}
                </Text>
            </Flex>
        )
}
