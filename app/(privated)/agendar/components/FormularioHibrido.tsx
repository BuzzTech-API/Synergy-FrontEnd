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
import { createReservation, createReservationHibrid } from "../service/postReservation";
import { useSession } from "next-auth/react";
import { createMeeting } from "../service/createMeeting";
import { createGuests } from "../service/createGuests";
import { createMeetingGuest } from "../service/createMeetingGuest";
import { createMeetingUsers } from "../service/createMeetingUsers";
import { calcularMinutosTotal } from "../service/calculateEnd";
import { cadastrarZoomMeeting } from "./Salas/services/ZoomService";
import SalasVirtuais from "./Salas/SalasVirtuais";
import { FormInputAgendarNumber } from "./FormInputAgendarNumber";
import { EmailInfos, Receptores } from "@/app/type/templateEmail/emailInfos";
import { GetReservationSalaService } from "./Salas/services/SalasService";
import { PhysicalRooms } from "@/app/type/rooms";
import { sendConvidadosMails } from "@/app/utils/emailSender";
import { AtaInfos } from "@/app/type/ataInfos";
import { sendEmailAta } from "@/app/utils/emailATAsender";

type participanteDeFora = {
  participante_nome: string,
  participante_email: string
}

export default function FormularioHibrido() {

  const session = useSession()

  const zoomAccessToken = localStorage.getItem("zoom_access_token")
  const zoomRefreshToken = localStorage.getItem("zoom_refresh_token")


  // Data para filtrar os cards
  const [dataParaCard, setDataParaCard] = useState(new Date())

  // Objeto para criar o agendamento e a reunião
  const [agendamento, setAgendamento] = useState({
    meeting_title: '',
    reserve_date: formatData(new Date()),
    virtual_room_id: 0,
    physical_room_id: 0,
    qntMinimaParticipantes: 0,
    participante_nome: '',
    participante_email: "",
    duracao: "", // Adicionado campo de duração
    inicio: "", // Adicionado campo de horário de início
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



  const handleNumberInputChange = (e: number, setIsError: Dispatch<SetStateAction<boolean>>) => {

    let isValid = true

    // Validação genérica para outros campos (não vazios)
    isValid = e !== 0
    setIsError(!isValid)

    // função para lidar com as alterações do formulário e quando o usuário fizer algo errado mostrar erro no campo
    setIsError(!isValid)

    setAgendamento(prevState => ({
      ...prevState,
      qntMinimaParticipantes: e
    }))
  }


  const handleCardChange = (id: number) => {
    setAgendamento((prevstate) => ({
      ...prevstate,
      physical_room_id: id
    }))
  }

  const handleCardVirtualChange = (id: number) => {

    setAgendamento((prevstate) => ({
      ...prevstate,
      virtual_room_id: id
    }))
  }

  const onSubmit = async (e: any) => {
    e.preventDefault();
    toast.closeAll()

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
      } else if (agendamento.physical_room_id === 0) {
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
          description: "Você precisa selecionar o horário de início e a duração corretamente.",
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

      if (!zoomAccessToken && !zoomRefreshToken) {
        toast.closeAll()
        toast({
          title: "Erro de autenticação no zoom",
          description: "Autentique no zoom e tente novamente",
          status: "error",
          position: 'top',
          duration: 3000,
          isClosable: false,
        })
        return
      }

      const userEmails = selectedUser.map((user: User) => {
        const recept: Receptores = { name: user.user_name, address: user.user_email }
        console.log(recept);

        return recept
      })

      const participanteForaEmails = participantesFora.map((user: participanteDeFora) => {
        const recept: Receptores = { name: user.participante_nome, address: user.participante_email }
        return recept
      })
      const emails: Receptores[] = userEmails.concat(participanteForaEmails)




      const zoomBody = {
        access_token: zoomAccessToken,
        refresh_token: zoomRefreshToken,
        topic: agendamento.meeting_title,
        start_time: agendamento.reserve_date + "T" + agendamento.inicio + ":00",
        duration: calcularMinutosTotal(agendamento.duracao),
        agenda: agendamento.assuntoReuniao,
        meeting_invites: emails.map((receptor) => receptor.address)
      }

      const zoomMeeting = await cadastrarZoomMeeting(zoomBody)

      const localizacao: PhysicalRooms = await GetReservationSalaService(agendamento.physical_room_id)

      const emailInfos: EmailInfos = {
        assunto: agendamento.assuntoReuniao,
        titulo: agendamento.meeting_title,
        listaDePessoas: emails,
        linkParaSala: zoomMeeting.join_url,
        localizacaoSalaPresencial: localizacao.physical_room_address
      }
      const enviarEmails = await sendConvidadosMails(emailInfos)

      const ataInfos: AtaInfos = {
        assunto: agendamento.assuntoReuniao,
        data: agendamento.reserve_date,
        horario: agendamento.inicio,
        local:"Zoom / " + localizacao.physical_room_name,
        //ja to pegando la na função
        relator: ""
      }

      const enviarATA = await sendEmailAta(emailInfos, ataInfos)


      if (zoomMeeting) {
        toast({
          title: "Link da sala virtual",
          description: <a href={zoomMeeting.join_url}>{zoomMeeting.join_url}</a>,
          status: "success",
          position: 'top',
          duration: null,
          isClosable: true,
        })
      }

      // Obter o horário de início da reunião
      const startTime = new Date(agendamento.reserve_date + "T" + agendamento.inicio + ":00");

      // Converter a duração para número
      const duration = parseInt(agendamento.duracao);

      // Calcular o horário de término adicionando a duração ao horário de início
      const endTime = new Date(startTime.getTime() + duration * 60000); // Convertendo minutos para milissegundos

      const reserve = await createReservationHibrid({
        "reserve_date": agendamento.reserve_date,
        "reserve_start": startTime.toISOString(), // Usando o horário de início calculado
        "reserve_end": endTime.toISOString(), // Usando o horário de término calculado
        "physical_room_id": agendamento.physical_room_id,
        "virtual_room_id": agendamento.virtual_room_id
      })

      const meeting = await createMeeting({
        "meeting_title": agendamento.meeting_title,
        "meeting_subject": agendamento.assuntoReuniao,
        "meeting_type": "Híbrido",
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
        virtual_room_id: 0,
        qntMinimaParticipantes: 0,
        participante_nome: '',
        participante_email: "",
        duracao: "", // Resetando a duração
        inicio: "", // Resetando o horário de início
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
        <Flex gap={'10rem'} width="100%">
          {/* Container para inputs de título, duração, data de realização e horário de início */}
          <Flex flexDir={'column'} gap={"1rem"} width="50%">
            {/* Input do titulo */}
            <FormInputAgendar handleInputChange={handleInputChange} input={agendamento.meeting_title} campo="Título da Reunião" id="meeting_title" type="text" />
            {/* Input para duração da reunião */}
            <FormInputAgendar handleInputChange={handleInputChange} input={agendamento.duracao} campo="Duração" id="duracao" type="time" width="8rem" />
            {/* Input da Data de Realização */}
            <FormInputAgendar handleInputChange={handleInputChange} input={agendamento.reserve_date} campo="Data de Realização" id="reserve_date" type="date" width="10rem" />
            {/* Input para horário de início */}
            <FormInputAgendar handleInputChange={handleInputChange} input={agendamento.inicio} campo="Horário de Início" id="inicio" type="time" width="8rem" />
            {/* Input para Quantidade Mínima */}
            <FormInputAgendarNumber handleInputChange={handleNumberInputChange} input={agendamento.qntMinimaParticipantes} campo="Quantidade Mínima" id="inicio" width="12rem" />
          </Flex>
          {/* Input de Assunto da Reunião */}
          <Flex flexDir={'column'} width="50%">
            <FormInputAgendar handleInputChange={handleInputChange} input={agendamento.assuntoReuniao} campo="Assunto da Reunião" id="assuntoReuniao" type="textarea" />
          </Flex>
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
        <Salas onclick={handleCardChange} tipo={"Presencial"} dataRealizacaoReuniao={agendamento.reserve_date} qntMinima={agendamento.qntMinimaParticipantes} />

        {/* Cards das Salas virtuais */}
        <SalasVirtuais onclick={handleCardVirtualChange} tipo={"Virtual"} dataRealizacaoReuniao={agendamento.reserve_date} />

        {/* Botão para enviar o agendamento */}
        <BtnAgendar type="submit" />
      </Center >
    </form >
  )
}
