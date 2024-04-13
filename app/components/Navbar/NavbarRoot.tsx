'use client'

import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import Logo from "../../../public/logo.png"
import Link from "next/link";

interface NavbarRootProps {
    children: ReactNode
}

export default function NavbarRoot({ children }: NavbarRootProps) {
    return (
        <Flex
            zIndex='10'
            w='100vw'
            h='5rem'
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

            <Link href={'/'}>
                <Box
                    position='absolute'
                    zIndex='23'
                    top={'-1rem'}
                    left={'13rem'}
                    height={'5rem'}
                >
                    <Image zIndex={23} src={Logo.src} width="15rem" />
                </Box>
            </Link>
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
