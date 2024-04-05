'use client'

import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface NavbarRootProps {
    children: ReactNode
}

export default function NavbarRoot({ children }: NavbarRootProps) {
    return (
        <Flex
            zIndex='999'
            w='100vw'
            h='7rem'
            bg='white'
            alignItems='center'
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
            position='fixed'
            justifyContent='space-between'>

            <Image
                src="./img-navbar.png"
                w='100%'
                position='absolute'
                zIndex='-2'
                h='100%' />

            <Box
                position='absolute'
                zIndex='-1'
                pl='20rem'>
                <Text fontSize='25px'>LOGO</Text>
            </Box>

            <Flex
                w='100%'
                h='100%'
                justifyContent='space-between'
                alignItems='center'
                px='24'
                zIndex='15'>
                {children}
            </Flex>

        </Flex>
    )
}