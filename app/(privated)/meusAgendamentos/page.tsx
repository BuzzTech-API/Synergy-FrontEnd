'use client'
import { Flex, Heading } from "@chakra-ui/react";
import { Cards } from "../../components/cards";
import { BtnDesmarcar } from "../../components/buttons/IconBtns/BtnDesmarcar&Cancelar";
import { BtnReagendar } from "../../components/buttons/IconBtns/BtnAgendar&Reagendar";
import { Navbar } from "../../components/Navbar/Navbar";


export default function MeusAgendamentos() {
  return (
    <main>
      <Navbar.Root>
        <Navbar.Menu />
        <Navbar.Perfil />
      </Navbar.Root>
      <Flex flexDir={'column'} p={'1rem'} pt={'5rem'} gap={'0.7rem'}>
        <Heading>Reuniões Marcadas</Heading>
        <Flex
          overflowY={'auto'}
          pb={'0.3rem'}
        >
          <Cards.Root
            variant="reuniao"
          >
            <Cards.Header>Reunião</Cards.Header>
            <Cards.BodyReuniao tituloReuniao="Lorem Impsum Dolor" data="../../12/2024" horaInicio="18:00" horaFim="20:00">
              <BtnReagendar />
            </Cards.BodyReuniao>
          </Cards.Root>
        </Flex>
        <Heading>Reuniões como participante</Heading>
        <Flex
          pb={'0.3rem'}
          overflowY={'auto'}
        >
          <Cards.Root
            variant="reuniao"
          >
            <Cards.Header>Reunião</Cards.Header>
            <Cards.BodyReuniao tituloReuniao="Lorem Impsum Dolor" data="../../12/2024" horaInicio="18:00" horaFim="20:00">
              <BtnDesmarcar />
            </Cards.BodyReuniao>
          </Cards.Root>
        </Flex>
      </Flex>
    </main>
  )
}
