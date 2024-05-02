'use client'

import { Center, Flex, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import CadastrarSalaPresencial from "./formularioPresencial";
import React, { useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import CadastrarSalaVirtual from "./formularioVirtual";


export default function CreateRoomPage() {
    const [radioTipo, setRadio] = useState('1')
    return (
        <main>
            <Flex justifyContent={"center"} >
                <Navbar.Root>
                    <Navbar.Menu />
                    <Navbar.Perfil />
                </Navbar.Root>
                <Center marginTop={'7rem'} position={"fixed"}>
                    <RadioGroup onChange={setRadio} value={radioTipo}>
                        <Stack direction='row'  >
                            <Radio value='presencial' colorScheme='yellow' borderColor='#A0A0A0'>Presencial</Radio>
                            <Radio value='virtual' colorScheme='yellow' borderColor='#A0A0A0'>Virtual</Radio>
                        </Stack>
                    </RadioGroup>
                </Center>
                {radioTipo === 'presencial' && <CadastrarSalaPresencial />}
                {radioTipo === 'virtual' && <CadastrarSalaVirtual />}
            </Flex>
        </main>
    )
}
