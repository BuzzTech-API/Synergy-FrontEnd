import { Button, Center, Flex, Heading, useToast } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, MouseEventHandler, SetStateAction, useEffect, useState } from "react";
import { FormInputAgendar } from "./FormInputAgendar";
import { formatData } from "../service/formatData";
import { User } from "@/app/type/user";
import { BtnAgendar } from "@/app/components/buttons/IconBtns/BtnAgendar&Reagendar";
import Salas from "./Salas/Salas";
import { createReservation } from "../service/postReservation";
import { useSession } from "next-auth/react";

type participanteDeFora = {
  participante_nome: string,
  participante_email: string
}

export default function formIndividual() {

    const session = useSession()


  // useState para controlar a validade dos campos
  const [nameValid, setNameValid] = useState(false)
  const [emailValid, setEmailValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [boardValid, setBoardValid] = useState(false)
  const [dataParaCard, setDataParaCard] = useState(new Date())

  // Objeto para criar o agendamento e a reunião
  const [agendamento, setAgendamento] = useState({
    reserve_date: formatData(new Date()),
    physical_room_id: 0,
    inicio: "",
    fim: "",
  })


  // Lista de Usuários que vão participar da Reunião
  const [selectedUser, setSelectedUser] = useState<User[]>(new Array<User>())

  // Lista Participantes de Fora
  const [participantesFora, setParticipantesFora] = useState<Array<participanteDeFora>>(new Array<participanteDeFora>())


  const toast = useToast()
  // verifica se todos os campos estão preenchido
  const isFormValid = nameValid && emailValid && passwordValid && boardValid


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
    } else if (id === 'reserve_date') {
      setDataParaCard(new Date(value))
      }
  }

  const handleCardChange = (id: number) => {
    setAgendamento ((prevstate) => ({
        ...prevstate,
        physical_room_id: id
    } ))

  }

  const onSubmit = (e:any) => {
    e.preventDefault()
    createReservation({
        "reserve_start":agendamento.reserve_date+" "+agendamento.inicio+":00",
        "reserve_end":agendamento.reserve_date+" "+agendamento.fim+":00",
        "reserve_date":agendamento.reserve_date,
        "user_id":session.data?.user.user_id,
        "physical_room_id":agendamento.physical_room_id,
        })

  }




  return (
    <form onSubmit={onSubmit}>
      <Center flexDir={'column'} gap={'1rem'} p={'2rem'}>
        <FormInputAgendar width="30%" handleInputChange={handleInputChange} input={agendamento.reserve_date} campo="Data de Realização" id="reserve_date" type="date" />
        
        <Salas onclick={handleCardChange} tipo={"Presencial"} dataRealizacaoReuniao={dataParaCard} />

        <Heading>Horário de Realização</Heading>
        <Flex gap={'12rem'}>
          <FormInputAgendar handleInputChange={handleInputChange} width="100%" input={agendamento.inicio} campo="Início" id="inicio" type="time" />
          <FormInputAgendar handleInputChange={handleInputChange} width="100%" input={agendamento.fim} campo="Fim" id="fim" type="time" />
        </Flex>

        <BtnAgendar type = "submit"/>
      </Center>
    </form>
  )
}

