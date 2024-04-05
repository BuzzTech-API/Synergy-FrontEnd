'use client'

import { Box, Text, Flex, Heading, IconButton, Input, InputGroup, InputRightElement, Grid, GridItem, HStack } from "@chakra-ui/react";
import { ImSearch } from "react-icons/im";
import TabBarUsuario from "./TabBarUsuario";

export default function TabUsuarios() {

    return (

        <Box
            w='180rem'
            h='100rem'>

            <Flex
                border='1px solid black'
                h='10%'>
                <HStack
                    gap='2rem'>
                    <Heading
                        as='h2'
                        fontSize='2.5rem'>
                        Pesquisar
                    </Heading>
                    <Flex
                        w='35rem'>
                        <InputGroup size='lg'>
                            <Input w='100%' />
                            <InputRightElement>
                                <IconButton
                                    bg='none'
                                    aria-label='search'
                                    icon={<ImSearch size='2rem' />} />
                            </InputRightElement>
                        </InputGroup>
                    </Flex>
                </HStack>
            </Flex>

            <Box
                h='90%'>
                <Grid
                    bg='#13ACEE'
                    h='8%'
                    borderRadius='5px'
                    templateColumns='repeat(6, 1fr)'
                    gap={6}>
                    <GridItem colSpan={1}>
                        <Flex
                            alignItems='center'
                            justifyContent='center'
                            h='100%'>
                            <Text color='white' fontSize='2rem'>
                                Nome
                            </Text>
                        </Flex>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Flex
                            alignItems='center'
                            justifyContent='center'
                            h='100%'>
                            <Text color='white' fontSize='2rem'>
                                Email
                            </Text>
                        </Flex>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Flex
                            alignItems='center'
                            justifyContent='center'
                            h='100%'>
                            <Text color='white' fontSize='2rem'>
                                Cargo
                            </Text>
                        </Flex>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Flex
                            alignItems='center'
                            justifyContent='center'
                            h='100%'>
                            <Text color='white' fontSize='2rem'>
                                Nivel De Permissão
                            </Text>
                        </Flex>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Flex
                            alignItems='center'
                            justifyContent='center'
                            h='100%'>
                            <Text color='white' fontSize='2rem'>
                                Ações
                            </Text>
                        </Flex>
                    </GridItem>
                </Grid>

                <Box
                    h='92%'
                    overflowY='auto'>
                    <TabBarUsuario nome="Marilene" cargo="Engenheiro" email="marilene@gmail.com" nivel={3} tipo="administrador" />
                    <TabBarUsuario nome="Isadora Leite" cargo="RH" email="isadora@gmail.com" nivel={2} tipo="comum" />
                    <TabBarUsuario nome="Isadora Leite" cargo="RH" email="isadora@gmail.com" nivel={2} tipo="comum" />
                    <TabBarUsuario nome="Isadora Leite" cargo="RH" email="isadora@gmail.com" nivel={2} tipo="comum" />
                    <TabBarUsuario nome="Isadora Leite" cargo="RH" email="isadora@gmail.com" nivel={2} tipo="comum" />
                    <TabBarUsuario nome="Isadora Leite" cargo="RH" email="isadora@gmail.com" nivel={2} tipo="comum" />
                    <TabBarUsuario nome="Isadora Leite" cargo="RH" email="isadora@gmail.com" nivel={2} tipo="comum" />
                    <TabBarUsuario nome="Isadora Leite" cargo="RH" email="isadora@gmail.com" nivel={2} tipo="comum" />
                    <TabBarUsuario nome="Isadora Leite" cargo="RH" email="isadora@gmail.com" nivel={2} tipo="comum" />
                    <TabBarUsuario nome="Isadora Leite" cargo="RH" email="isadora@gmail.com" nivel={2} tipo="comum" />
                    <TabBarUsuario nome="Isadora Leite" cargo="RH" email="isadora@gmail.com" nivel={2} tipo="comum" />
                </Box>
            </Box>


        </Box>

    )
}