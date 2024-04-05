'use client'

import { Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react"

interface TabBarUsuariosProps {
    nome: string,
    email: string,
    cargo: string,
    nivel: number,
    tipo: string
}

export default function TabBarUsuario({ nome, email, cargo, nivel, tipo }: TabBarUsuariosProps) {

    const renderBarUsuario = () => {
        //Lógica e botão provisórios
        if (tipo === 'administrador') {
            return (
                <>
                    <Button colorScheme='red'>Remover</Button>
                    <Button colorScheme='orange'>Editar</Button>
                </>
            )
        } else if (tipo === 'comum') {
            return (
                <>
                    <Button colorScheme='orange'>Editar</Button>
                </>
            )

        }
    }

    return (

        <Grid
            bg='white'
            h='90px'
            borderRadius='22px'
            templateColumns='repeat(6, 1fr)'
            gap={6}
            mt='3rem'
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)">
            <GridItem colSpan={1}>
                <Flex
                    alignItems='center'
                    justifyContent='center'
                    h='100%'>
                    <Text color='black' fontSize='1rem'>
                        {nome}
                    </Text>
                </Flex>
            </GridItem>
            <GridItem colSpan={1}>
                <Flex
                    alignItems='center'
                    justifyContent='center'
                    h='100%'>
                    <Text color='black' fontSize='1rem'>
                        {email}
                    </Text>
                </Flex>
            </GridItem>
            <GridItem colSpan={1}>
                <Flex
                    alignItems='center'
                    justifyContent='center'
                    h='100%'>
                    <Text color='black' fontSize='1rem'>
                        {cargo}
                    </Text>
                </Flex>
            </GridItem>
            <GridItem colSpan={1}>
                <Flex
                    alignItems='center'
                    justifyContent='center'
                    h='100%'>
                    <Text color='black' fontSize='1rem'>
                        {nivel.toString()}
                    </Text>
                </Flex>
            </GridItem>
            <GridItem colSpan={2}>
                <Flex
                    alignItems='center'
                    justifyContent='center'
                    h='100%'
                    w='100%'
                    gap='1rem'>
                    {renderBarUsuario()}
                </Flex>
            </GridItem>
        </Grid>

    )
}