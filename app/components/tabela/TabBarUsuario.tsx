'use client'

import { User } from "@/app/type/user"
import { Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react"
import { BtnRemover } from "../buttons/IconBtns/BtnRemover&Entrar"

interface TabBarUsuariosProps {
    user: User
    deleteUser: (user: User) => void
}

export default function TabBarUsuario({ user, deleteUser }: TabBarUsuariosProps) {

    const renderBarUsuario = () => {
        //Lógica e botão provisórios
        if (user.user_permission_level === 10) {
            return (
                <>
                    <Button colorScheme='orange'>Editar</Button>
                </>
            )
        } else 
            return (
                <>
                    <BtnRemover colorScheme='red' onClick={() => deleteUser(user)} >Remover</BtnRemover>
                    <Button colorScheme='orange'>Editar</Button>
                </>
            )
    }

    return (
    <>{ user.is_active &&
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
                        {user.user_name}
                    </Text>
                </Flex>
            </GridItem>
            <GridItem colSpan={1}>
                <Flex
                    alignItems='center'
                    justifyContent='center'
                    h='100%'>
                    <Text color='black' fontSize='1rem'>
                        {user.user_email}
                    </Text>
                </Flex>
            </GridItem>
            <GridItem colSpan={1}>
                <Flex
                    alignItems='center'
                    justifyContent='center'
                    h='100%'>
                    <Text color='black' fontSize='1rem'>
                        {user.user_board}
                    </Text>
                </Flex>
            </GridItem>
            <GridItem colSpan={1}>
                <Flex
                    alignItems='center'
                    justifyContent='center'
                    h='100%'>
                    <Text color='black' fontSize='1rem'>
                        {user.user_permission_level != undefined && user.user_permission_level.toString()}
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

    }
    </>)
}