'use client'
import { Flex, Heading } from "@chakra-ui/react";
import { Cards } from "../../components/cards";
import { BtnDesmarcar } from "../../components/buttons/IconBtns/BtnDesmarcar&Cancelar";
import { BtnReagendar } from "../../components/buttons/IconBtns/BtnAgendar&Reagendar";
import { Navbar } from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { User } from "@/app/type/user";
import { getUserInTheSession } from "../agendar/service/getUsers";


export default function MeusAgendamentos() {

  const [user, setUser] = useState<User>()
  useEffect(
    () => {
      async function fetchUser() {
        const response: User = await getUserInTheSession()
        setUser(response)
      }
      fetchUser()
    }
  )
  function formatarData(dataString: string): string {
    const dataUTC = new Date(dataString);
    const dia = dataUTC.getDate().toString().padStart(2, '0');
    const mes = (dataUTC.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataUTC.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  // Função para retornar as horas e minutos
  function obterHorasMinutos(dataString: string): string {
    const dataUTC = new Date(dataString);
    const horas = dataUTC.getHours().toString().padStart(2, '0');
    const minutos = dataUTC.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`;
  }

  const preencheReuniaoMarcadas = () => {
    return user?.participate.map((participa, index) => {
      const reservaCriadoPeloUsuario = user.reservations.filter((reservatio) => reservatio.reserve_id === participa.meetings.reservations.reserve_id)
      if (reservaCriadoPeloUsuario.length !== 0) {
        return (<Cards.Root
          variant="reuniao"
          key={participa.meeting_id}
        >
          <Cards.Header>Reunião</Cards.Header>
          <Cards.BodyReuniao
            tituloReuniao={participa.meetings.meeting_title}
            data={formatarData(participa.meetings.reservations.reserve_date)}
            horaInicio={obterHorasMinutos(participa.meetings.reservations.reserve_start)}
            horaFim={obterHorasMinutos(participa.meetings.reservations.reserve_end)}>
            <BtnReagendar />
          </Cards.BodyReuniao>
        </Cards.Root>


        )
      }
      return
    }
    )

  }

  const preencheReuniaoParticipante = () => {
    return user?.participate.map((participa, index) => {
      const reservaCriadoPeloUsuario = user.reservations.filter((reservatio) => reservatio.reserve_id === participa.meetings.reservations.reserve_id)
      if (reservaCriadoPeloUsuario.length === 0) {
        return (<Cards.Root
          variant="reuniao"
          key={participa.meeting_id}
        >
          <Cards.Header>Reunião</Cards.Header>
          <Cards.BodyReuniao
            tituloReuniao={participa.meetings.meeting_title}
            data={formatarData(participa.meetings.reservations.reserve_date)}
            horaInicio={obterHorasMinutos(participa.meetings.reservations.reserve_start)}
            horaFim={obterHorasMinutos(participa.meetings.reservations.reserve_end)}>
            <BtnDesmarcar />
          </Cards.BodyReuniao>
        </Cards.Root>


        )
      }
      return
    }
    )


  }
  return (
    <main>
      <Navbar.Root>
        <Navbar.Menu />
        <Navbar.Perfil />
      </Navbar.Root>
      <Flex flexDir={'column'} pl={'1rem'} pt={'4.85rem'} gap={'0.4rem'}>
        <Heading>Reuniões Marcadas</Heading>
        <Flex
          overflowY={'auto'}
          pb={'0.3rem'}
          gap={'1rem'}
        >
          {preencheReuniaoMarcadas()}
        </Flex>
        <Heading>Reuniões como participante</Heading>
        <Flex
          pb={'0.3rem'}
          overflowY={'auto'}
          gap={'1rem'}
        >
          {preencheReuniaoParticipante()}
        </Flex>
      </Flex>
    </main>
  )
}
