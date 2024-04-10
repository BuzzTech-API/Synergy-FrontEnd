'use client'
import { Flex, Heading } from "@chakra-ui/react";
import { Cards } from "../components/cards";
import { BtnCancelar, BtnDesmarcar } from "../components/buttons/IconBtns/BtnDesmarcar&Cancelar";
import { BtnReagendar } from "../components/buttons/IconBtns/BtnAgendar&Reagendar";

export default function MeusAgendamentos() {
  return (
    <main>
      <Flex flexDir={'column'} p={'1rem'} gap={'1rem'}>
        <Heading>Reuniões Marcadas</Heading>
        <Flex
          overflowY={'auto'}
          pb={'0.3rem'}
        >
          <Cards.Root
            variant="reuniao"
          >
            <Cards.Header>Reunião</Cards.Header>
            <Cards.BodyReuniao tituloReuniao="Lorem Impsum Dolor" data="24/12/2024" horaInicio="18:00" horaFim="20:00">
              <BtnReagendar />
              <BtnCancelar />
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
            <Cards.BodyReuniao tituloReuniao="Lorem Impsum Dolor" data="24/12/2024" horaInicio="18:00" horaFim="20:00">
              <BtnDesmarcar />
            </Cards.BodyReuniao>
          </Cards.Root>
        </Flex>
      </Flex>
    </main>
  )
}
