import { Center, Flex, Heading, useToast } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { FormInputAgendar } from "./FormInputAgendar";
import { formatData } from "../service/formatData";
import SearchInput from "@/app/components/SearchBar";
import { User } from "@/app/type/user";
import Accordion from "@/app/components/accordion/accordion";
import { BtnAdicionar2 } from "@/app/components/buttons/BtnAdicionar2";
import { Cards } from "@/app/components/cards";
import { BtnAgendar } from "@/app/components/buttons/IconBtns/BtnAgendar&Reagendar";
import Salas from "./Salas/Salas";
import { createReservation } from "../service/postReservation";
import { useSession } from "next-auth/react";
import { createMeeting } from "../service/createMeeting";
import { createGuests } from "../service/createGuests";
import { createMeetingGuest } from "../service/createMeetingGuest";
import { createMeetingUsers } from "../service/createMeetingUsers";
import { calcularReserveEnd } from "../service/calculateEnd";

type participanteDeFora = {
  participante_nome: string,
  participante_email: string
}

export default function FormularioVirtual() {

  const session = useSession()



  // Data para filtrar os cards
  const [dataParaCard, setDataParaCard] = useState(new Date())

  // Objeto para criar o agendamento e a reunião
  const [agendamento, setAgendamento] = useState({
    meeting_title: '',
    reserve_date: formatData(new Date()),
    physical_room_id: 0,
    participante_nome: '',
    participante_email: "",
    inicio: "",
    duracao: "",
    assuntoReuniao: "",
  })


  // Lista de Usuários que vão participar da Reunião
  const [selectedUser, setSelectedUser] = useState<User[]>(new Array<User>())

  // Lista Participantes de Fora
  const [participantesFora, setParticipantesFora] = useState<Array<participanteDeFora>>(new Array<participanteDeFora>())


  const toast = useToast()

  const handleAdicionarParticipanteDeFora = () => {
    if (agendamento.participante_nome !== '' && agendamento.participante_email !== '') {
      const novoParticipante: participanteDeFora = {
        participante_email: agendamento.participante_email,
        participante_nome: agendamento.participante_nome
      }
      setParticipantesFora(participantesFora.concat(novoParticipante))
      setAgendamento(prevState => ({
        ...prevState,
        participante_nome: "",
        participante_email: ""

      }))
    }
  }


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setIsError: Dispatch<SetStateAction<boolean>>) => {
    const { id, value } = e.target

    let isValid = true

    if (id === 'reserve_date') {
      const currentDate = new Date()
      currentDate.setDate(currentDate.getDate() - 1)
      const selectedDate = new Date(value)
      isValid = selectedDate >= currentDate
      setIsError(!isValid)
    } else if (id === 'participante_nome' || id === 'participante_email') {
      // Não faz nada porque esses campos não são obrigatórios
    } else if (id) {
      // Validação genérica para outros campos (não vazios)
      isValid = value.trim() !== ''
      setIsError(!isValid)
    }

    // função para lidar com as alterações do formulário e quando o usuário fizer algo errado mostrar erro no campo
    setIsError(!isValid)

    setAgendamento(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  const handleCardChange = (id: number) => {
    setAgendamento((prevstate) => ({
      ...prevstate,
      physical_room_id: id
    }))

  }
  const onSubmit = async (e: any) => {
    e.preventDefault()

    // Exibe um toast indicando que o envio do formulário está em andamento
    const loadingToast = toast({
      title: "Enviando",
      description: "O formulário está sendo enviado...",
      status: "info",
      position: 'top',
      duration: null, // Define a duração como null para manter o toast visível enquanto estiver carregando
      isClosable: false, // Impede que o usuário feche o toast enquanto estiver carregando
    })
    try {
      if (agendamento.meeting_title === '') {
        toast.close(loadingToast)
        toast({
          title: "Erro",
          description: "Informe o título da reunião.",
          status: "error",
          position: 'top',
          duration: 3000,
          isClosable: true,
        })
        return
      }
      if (agendamento.reserve_date === '') {
        toast.close(loadingToast)
        toast({
          title: "Erro",
          description: "Você precisa informar a data de realização.",
          status: "error",
          position: 'top',
          duration: 3000,
          isClosable: true,
        })
        return
      }
      else if (agendamento.physical_room_id === 0) {
        toast.close(loadingToast)
        toast({
          title: "Erro",
          description: "Você precisa selecionar uma sala.",
          status: "error",
          position: 'top',
          duration: 3000,
          isClosable: true,
        })
        return
      } else if (selectedUser.length === 0) {
        // Se nenhum participante foi selecionado, exibe uma mensagem de erro
        toast.close(loadingToast)
        toast({
          title: "Erro",
          description: "Você precisa selecionar pelo menos um participante.",
          status: "error",
          position: 'top',
          duration: 3000,
          isClosable: true,
        })
        return // Encerra a função onSubmit para evitar o envio do formulário
      } else if (agendamento.inicio === '' || agendamento.duracao === '') {
        toast.close(loadingToast)
        toast({
          title: "Erro",
          description: "Você precisa selecionar o horário de realização corretamente.",
          status: "error",
          position: 'top',
          duration: 3000,
          isClosable: true,
        })
        return
      }
      if (agendamento.assuntoReuniao === '') {
        toast.close(loadingToast)
        toast({
          title: "Erro",
          description: "Informe o assunto da reunião.",
          status: "error",
          position: 'top',
          duration: 3000,
          isClosable: true,
        })
        return
      }

      const data_end = calcularReserveEnd(agendamento.reserve_date, agendamento.inicio, agendamento.duracao)
      data_end.setMinutes(data_end.getMinutes() - data_end.getTimezoneOffset())
      const reserve_end = data_end.toISOString()


      const reserve = await createReservation({
        "reserve_date": agendamento.reserve_date,
        "reserve_start": agendamento.reserve_date + "T" + agendamento.inicio + ":00",
        "reserve_end": reserve_end,
        "physical_room_id": agendamento.physical_room_id,
      })

      const meeting = await createMeeting({
        "meeting_title": agendamento.meeting_title,
        "meeting_subject": agendamento.assuntoReuniao,
        "meeting_type": "Presencial",
        "reserve_id": reserve.reserve_id,
      })
      const participantes = await createGuests(participantesFora)
      const meetGuests = await createMeetingGuest({
        "meeting_id": meeting.meeting_id,
        "guests_list": participantes.map((participante) => { return participante.guest_id })
      })
      const meetUsers = await createMeetingUsers({
        "meeting_id": meeting.meeting_id,
        "users_list": selectedUser.map((participante) => { return participante.user_id })
      })
      toast.close(loadingToast)

      setDataParaCard(new Date())
      setAgendamento({
        meeting_title: '',
        reserve_date: formatData(new Date()),
        physical_room_id: 0,
        participante_nome: '',
        participante_email: "",
        inicio: "",
        duracao: "",
        assuntoReuniao: "",
      })
      setSelectedUser([])
      setParticipantesFora([])

      toast({
        title: "Sucesso",
        description: "O formulário foi enviado com sucesso!",
        status: "success",
        position: 'top',
        duration: 3000,
        isClosable: true,
      })

    } catch (error) {
      toast.close(loadingToast)

      toast({
        title: "Erro",
        description: "Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.",
        status: "error",
        position: 'top',
        duration: 3000,
        isClosable: true,
      })
    }
  }


  return (
    <form onSubmit={onSubmit}>
      <Center flexDir={'column'} gap={'1rem'} p={'2rem'}>

        <Flex gap={'12rem'}>
          <Flex flexDir={"column"}
            gap={"1rem"}
            width={
              {
                base: "",
                sm: "",
                md: "",
                lg: "",
                xl: "",
                "2xl": "50rem"

              }}
          >

            {/* Input do titulo */}
            <FormInputAgendar width={"100%"} handleInputChange={handleInputChange} input={agendamento.meeting_title} campo="Título da Reunião" id="meeting_title" type="text" />

            {/* Input da Data de Realização */}
            <FormInputAgendar width="60%" handleInputChange={handleInputChange} input={agendamento.reserve_date} campo="Data de Realização" id="reserve_date" type="date" />

            {/* Inputs de Horário de Início */}
            <FormInputAgendar handleInputChange={handleInputChange} width="50%" input={agendamento.inicio} campo="Horário de Início" id="inicio" type="time" />


            {/* Inputs de Horário de Início */}
            <FormInputAgendar handleInputChange={handleInputChange} width="40%" input={agendamento.duracao} campo="Duração" id="duracao" type="number" />
          </Flex>

          {/* Input de Assunto da Reunião */}
          <FormInputAgendar handleInputChange={handleInputChange} input={agendamento.assuntoReuniao} campo="Assunto da Reunião" id="assuntoReuniao" type="textarea" />


        </Flex>


        {/* Parte dos Usuários do sistema que participam da reunião */}
        <Heading id="participantes">Participantes</Heading>
        <SearchInput selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        <Flex gap={'1rem'}>
          <Accordion users={selectedUser} setUsers={setSelectedUser} />
        </Flex>

        {/* Pare dos Participantes de Fora */}

        <Heading>Participantes de Fora</Heading>
        <Flex gap={'4rem'}>
          <FormInputAgendar handleInputChange={handleInputChange} input={agendamento.participante_nome} campo="Nome" id="participante_nome" type="text" />
          <FormInputAgendar handleInputChange={handleInputChange} input={agendamento.participante_email} campo="Email" id="participante_email" type="email" />
        </Flex>
        <BtnAdicionar2 onClick={handleAdicionarParticipanteDeFora} />
        <Flex flexDir={'column'} gap={'1rem'}>
          {
            participantesFora.map((participante, index) => {
              function removeParticipante() {
                setParticipantesFora(participantesFora.filter((item, indexFilter) => indexFilter !== index))
              }
              return (
                <Cards.Root variant="deitado" key={index}>
                  <Cards.BodyDeitado onClick={removeParticipante} nome={participante.participante_nome} email={participante.participante_email} />
                </Cards.Root>
              )
            })
          }
        </Flex>

        {/* Cards das Salas */}
        <Salas onclick={handleCardChange} tipo={"Virtual"} dataRealizacaoReuniao={dataParaCard} />

        {/* Botão para enviar o agendamento */}
        <BtnAgendar type="submit" />
      </Center>
    </form >
  )
}
