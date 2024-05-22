'use client'

import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, IconButton, Input, InputGroup, InputRightElement, Grid, GridItem, HStack } from "@chakra-ui/react";
import { ImSearch } from "react-icons/im";
import TabBarUsuario from "./TabBarUsuario";
import { getAllUsers } from '@/app/(privated)/agendar/service/getUsers';
import { User } from '@/app/type/user';


export default function TabUsuarios() {
    const [users, setUsers] = useState <User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pesquisa, setPesquisa] = useState("");

    useEffect(() => {
        getAllUsers().then(data => {
            setUsers(data);
            setLoading(false);
        }).catch(err => {
            setError(err.message);
            setLoading(false);
        });
    }, []);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar usuários: {error}</p>;

    return (

        <Box
            w='90%'
            h='90%'>
            <Flex
                h='10%'>
                <HStack
                    gap='2rem'>
                    <Heading
                        variant='big'>
                        Pesquisar
                    </Heading>
                    <Flex
                        w='35rem'>
                        <InputGroup size='lg'>
                            <Input onChange={(e:any) => {
                                setPesquisa(e.target.value)
                            }} w='100%' />
                            <InputRightElement>
                                <IconButton
                                    isDisabled
                                    borderRadius={0}
                                    boxShadow={'none'}
                                    bg='none'
                                    aria-label='search'
                                    icon={<ImSearch size='2rem' />} />
                            </InputRightElement>
                        </InputGroup>
                    </Flex>
                </HStack>
            </Flex>

            <Box pt={'1rem'}
                h='90%'>
                <Grid
                    bg='#13ACEE'
                    h='5%'
                    borderRadius='5px'
                    templateColumns='repeat(6, 1fr)'
                    gap={6}>
                    <GridItem colSpan={1}>
                        <Flex
                            alignItems='center'
                            justifyContent='center'
                            h='100%'>
                            <Heading color='white'>
                                Nome
                            </Heading>
                        </Flex>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Flex
                            alignItems='center'
                            justifyContent='center'
                            h='100%'>
                            <Heading color='white' >
                                Email
                            </Heading>
                        </Flex>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Flex
                            alignItems='center'
                            justifyContent='center'
                            h='100%'>
                            <Heading color='white' >
                                Cargo
                            </Heading>
                        </Flex>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Flex
                            textAlign={'center'}
                            alignItems='center'
                            justifyContent='center'
                            h='100%'>
                            <Heading color='white' >
                                Nivel De Permissão
                            </Heading>
                        </Flex>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Flex
                            alignItems='center'
                            justifyContent='center'
                            h='100%'>
                            <Heading color='white'>
                                Ações
                            </Heading>
                        </Flex>
                    </GridItem>
                </Grid>

                <Box padding={"1rem"}
                    h='95%'
                    overflowY='auto'>
                    {users.filter(user => user.user_name.toLowerCase().includes(pesquisa.toLowerCase())).
                    map(user => (
                        <TabBarUsuario
                            key={user.user_id}
                            nome={user.user_name}
                            email={user.user_email}
                            cargo={user.user_board}
                            nivel={user.user_permission_level}
                            tipo={user.user_permission_level === 10?"administrador":"comum"}
                        />
                    ))}
                </Box>
            </Box>

        </Box>

    )
}