'use client'

import { Avatar, Flex, Text } from "@chakra-ui/react"
import { useSession } from "next-auth/react"


export default function NavbarPerfil() {
    const { data: session } = useSession();

    if (session && session.user)
        return (
            <Avatar
                name={session.user.user_name}
                w='4rem'
                h='4rem'
                bg='#0066FF'
                alignItems='center'
                fontSize='1.3rem'

                color='white'
                justifyContent='center' />
        )
}
