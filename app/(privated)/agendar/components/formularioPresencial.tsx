import { FormControlInput } from "@/app/components/FormControlInput/FormControlInput";
import { Button, Center, Flex, Heading, useToast } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, MouseEventHandler, SetStateAction, useEffect, useState } from "react";
import { FormInputAgendar } from "./FormInputAgendar";
import { formatData } from "../service/formatData";
import SearchInput from "@/app/components/SearchBar";
import { getAllUsers } from "../service/getUsers";
import { User } from "@/app/type/user";
import Accordion from "@/app/components/accordion/accordion";
import { BtnAdicionar } from "@/app/components/buttons/BtnsAdicionar";
import { BtnAdicionar2 } from "@/app/components/buttons/BtnAdicionar2";
import { Cards } from "@/app/components/cards";
import { BtnAgendar } from "@/app/components/buttons/IconBtns/BtnAgendar&Reagendar";

type participanteDeFora = {
  participante_nome: string,
  participante_email: string
}

export default function FormularioPresencial() {

  // useState para controlar a validade dos campos
  const [nameValid, setNameValid] = useState(false)
  const [emailValid, setEmailValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [boardValid, setBoardValid] = useState(false)

  // Objeto para criar o agendamento e a reunião
  const [agendamento, setAgendamento] = useState({
    meeting_title: '',
    meeting_subject: '',
    reserve_date: formatData(new Date()),
    physical_room_id: 0,
    participante_nome: '',
    participante_email: "",
    inicio: "",
    fim: "",
    assuntoReuniao: "",
  })


  // Lista de Usuários que vão participar da Reunião
  const [selectedUser, setSelectedUser] = useState<User[]>(new Array<User>())

  // Lista Participantes de Fora
  const [participantesFora, setParticipantesFora] = useState<Array<participanteDeFora>>(new Array<participanteDeFora>())


  const toast = useToast()
  // verifica se todos os campos estão preenchido
  const isFormValid = nameValid && emailValid && passwordValid && boardValid

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

    if (id === 'name') {
      // Verifica se o valor não começa com espaço e não excede 150 caracteres
      isValid = value.trim() !== '' && value.length <= 150 && !value.startsWith(' ')
      setIsError(false)
    } else if (id === 'board') {
      // Verifica se o valor não começa com espaço e não excede 80 caracteres
      isValid = value.trim() !== '' && value.length <= 80 && !value.startsWith(' ')
      setIsError(false)
    } else {
      // Validação genérica para outros campos (não vazios)
      isValid = value.trim() !== ''
    }

    // função para lidar com as alterações do formulário e quando o usuário fizer algo errado mostrar erro no campo
    setIsError(!isValid)

    setAgendamento(prevState => ({
      ...prevState,
      [id]: value
    }))

    // Atualiza o estado de validade do campo
    if (id === 'name') {
      setNameValid(isValid)
    } else if (id === 'email') {
      setEmailValid(isValid)
    } else if (id === 'password') {
      setPasswordValid(isValid)
    } else if (id === 'board') {
      setBoardValid(isValid)
    }
  }



  return (
    <form>
      <Center flexDir={'column'} gap={'1rem'} p={'2rem'}>
        <FormInputAgendar width={"75%"} handleInputChange={handleInputChange} input={agendamento.meeting_title} campo="Título da Reunião" id="meeting_title" type="text" />
        <FormInputAgendar width="30%" handleInputChange={handleInputChange} input={agendamento.reserve_date} campo="Data de Realização" id="reserve_date" type="date" />
        <Heading>Participantes</Heading>
        <SearchInput selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        <Flex gap={'1rem'}>
          // Aqui Vai entrar os Accordions
          {selectedUser.map((user, index) => {

            return (<></>)
          })}
        </Flex>
        <Heading>Participantes de Fora</Heading>
        <Flex gap={'4rem'}>
          <FormInputAgendar handleInputChange={handleInputChange} input={agendamento.participante_nome} campo="Nome" id="participante_nome" type="text" />
          <FormInputAgendar handleInputChange={handleInputChange} input={agendamento.participante_email} campo="Email" id="participante_email" type="email" />
        </Flex>
        <BtnAdicionar2 onClick={handleAdicionarParticipanteDeFora} />
        <Flex flexDir={'column'} gap={'1rem'}>
          {
            participantesFora.map((participante, index) => {
              return (
                <Cards.Root variant="deitado" key={index}>
                  <Cards.BodyDeitado nome={participante.participante_nome} email={participante.participante_email} />
                </Cards.Root>
              )
            })
          }
        </Flex>
        // Aqui entrar a função das salas
        //
        //

        <Heading>Horário de Realização</Heading>
        <Flex gap={'12rem'}>
          <FormInputAgendar handleInputChange={handleInputChange} width="50%" input={agendamento.inicio} campo="Início" id="inicio" type="time" />
          <FormInputAgendar handleInputChange={handleInputChange} width="50%" input={agendamento.fim} campo="Fim" id="fim" type="time" />
        </Flex>

        <FormInputAgendar handleInputChange={handleInputChange} input={agendamento.assuntoReuniao} campo="Assunto da Reunião" id="assuntoReuniao" type="textarea" />
        <BtnAgendar />
      </Center>
    </form>
  )
}
