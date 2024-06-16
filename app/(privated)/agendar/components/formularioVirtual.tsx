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
import { createReservation, createReservationVirtual } from "../service/postReservation";
import { useSession } from "next-auth/react";
import { createMeeting } from "../service/createMeeting";
import { createGuests } from "../service/createGuests";
import { createMeetingGuest } from "../service/createMeetingGuest";
import { createMeetingUsers } from "../service/createMeetingUsers";
import { calcularMinutosTotal, calcularReserveEnd } from "../service/calculateEnd";
import SalasVirtuais from "./Salas/SalasVirtuais";
import { cadastrarZoomMeeting } from "./Salas/services/ZoomService";
import { EmailInfos, Receptores } from "@/app/type/templateEmail/emailInfos";
import { sendConvidadosMails } from "@/app/utils/emailSender";
import { AtaInfos } from "@/app/type/ataInfos";
import { sendEmailAta } from "@/app/utils/emailATAsender";
import { gerarHtmlReuniãoProxima } from "../../templates/templateReuniaoProxima/htmlString";
import { sendEmailScheduled } from "@/app/utils/emailScheduler";
import { sendEmailProps } from "@/app/type/emailTypes";

type participanteDeFora = {
  participante_nome: string,
  participante_email: string
}

export default function FormularioVirtual() {

  const session = useSession()

  const zoomAccessToken = localStorage.getItem("zoom_token")
  const zoomRefreshToken = localStorage.getItem("zoom_refresh_token")

  // Data para filtrar os cards
  const [dataParaCard, setDataParaCard] = useState(new Date())

  // Objeto para criar o agendamento e a reunião
  const [agendamento, setAgendamento] = useState({
    meeting_title: '',
    reserve_date: formatData(new Date()),
    virtual_room_id: 0,
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
      virtual_room_id: id
    }))

  }
  const onSubmit = async (e: any) => {
    e.preventDefault()
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
      }
      else if (agendamento.virtual_room_id === 0) {
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

      const data_end = calcularReserveEnd(agendamento.reserve_date, agendamento.inicio, agendamento.duracao)
      data_end.setMinutes(data_end.getMinutes() - data_end.getTimezoneOffset())
      const reserve_end = data_end.toISOString()


      const reserve = await createReservationVirtual({
        "reserve_date": agendamento.reserve_date,
        "reserve_start": agendamento.reserve_date + "T" + agendamento.inicio + ":00",
        "reserve_end": reserve_end,
        "virtual_room_id": agendamento.virtual_room_id,
      })

      const meeting = await createMeeting({
        "meeting_title": agendamento.meeting_title,
        "meeting_subject": agendamento.assuntoReuniao,
        "meeting_type": "Virtual",
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


      const emailInfos: EmailInfos = {
        assunto: agendamento.assuntoReuniao,
        titulo: agendamento.meeting_title,
        listaDePessoas: emails,
        linkParaSala: zoomMeeting.join_url,
      }

      const enviarEmails = await sendConvidadosMails(emailInfos)

      const ataInfos: AtaInfos = {
        assunto: agendamento.assuntoReuniao,
        data: agendamento.reserve_date,
        horario: agendamento.inicio,
        local: "Zoom",
        //ja to pegando la na função
        relator: ""
      }
      const enviarATA = await sendEmailAta(emailInfos, ataInfos)



      //Email Agendado para 1 hora antes, se precisar de ajuda para mudar só pedir >:) 
      const formatarData = (dataString: string): string => {
        const dataUTC = new Date(dataString);
        const dia = dataUTC.getDate().toString().padStart(2, '0');
        const mes = (dataUTC.getMonth() + 1).toString().padStart(2, '0');
        const ano = dataUTC.getFullYear();
        return `${dia}/${mes}/${ano}`;
      }
    
      const obterHorasMinutos = (dataString: string): string => {
        const dataUTC = new Date(dataString);
        const horas = dataUTC.getHours().toString().padStart(2, '0');
        const minutos = dataUTC.getMinutes().toString().padStart(2, '0');
        return `${horas}:${minutos}`;
      }
      const htmlAviso = `A reunião "${agendamento.meeting_title}" está agendada para começar em 1 hora!`;
      const htmlInformacoesReuniao = `
                    <h3 class="v-text-align" style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 13px; font-weight: 400;"><span><strong>Título da reunião: </strong></span></h3>
                    <p style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 11px;">${agendamento.meeting_title}</p>
                    <h3 class="v-text-align" style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 13px; font-weight: 400;"><span><strong>Tipo da reunião: </strong></span></h3>
                    <p style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 11px;">${'Virtual'}</p>
                    <h3 class="v-text-align" style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 13px; font-weight: 400;"><span><strong>Assunto da reunião: </strong></span></h3>
                    <p style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 11px;">${agendamento.assuntoReuniao}</p>
                    <h3 class="v-text-align" style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 13px; font-weight: 400;"><span><strong>Data da reunião: </strong></span></h3>
                    <p style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 11px;">${formatarData(agendamento.reserve_date)}</p>
                    <h3 class="v-text-align" style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 13px; font-weight: 400;"><span><strong>Horário de início: </strong></span></h3>
                    <p style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 11px;">${obterHorasMinutos(agendamento.inicio)}</p>`;
      const html = gerarHtmlReuniãoProxima(htmlAviso, htmlInformacoesReuniao);

      const argumentosSendEmail: sendEmailProps = {
        recipients: emails,
        subject: agendamento.assuntoReuniao,
        html: html,
      };

      //O scheduler usa 'Cron' que é uma notação de tempo muito massa. ai um conversor top a la-gpt
      const convertToCron = (date: string, time: string, hoursToSubtract: number): string  => {

          // Split the date string into day, month, and year
          const [day, month, year] = date.split('/').map(Number);
          // Split the time string into hours and minutes
          const [hours, minutes] = time.split(':').map(Number);
      
          // Create a Date object from the provided date and time
          const originalDate = new Date(year, month - 1, day, hours, minutes);
      
          // Subtract the specified number of hours (including fractional hours)
          const millisecondsToSubtract = hoursToSubtract * 60 * 60 * 1000;
          const adjustedDate = new Date(originalDate.getTime() - millisecondsToSubtract);
      
          // Extract the new day, month, year, hours, and minutes
          const newDay = adjustedDate.getDate();
          const newMonth = adjustedDate.getMonth() + 1; // getMonth() returns 0-11, so add 1
          const newYear = adjustedDate.getFullYear();
          const newHours = adjustedDate.getHours();
          const newMinutes = adjustedDate.getMinutes();
      
          // Construct the cron expression
          // Cron format: "minute hour day month weekday"
          // We set the weekday field to "*" to match any day of the week
          const cronExpression = `${newMinutes} ${newHours} ${newDay} ${newMonth} *`;
      
          return cronExpression;
      }

      const date = convertToCron(formatarData(agendamento.reserve_date), obterHorasMinutos(agendamento.inicio), .15 )


      const enviarEmailAgendado = await sendEmailScheduled(argumentosSendEmail, date);




      toast({
        title: "Link da sala virtual",
        description: <a href={zoomMeeting.join_url}>{zoomMeeting.join_url}</a>,
        status: "success",
        position: 'top',
        duration: null,
        isClosable: true,
      })
      toast.close(loadingToast)

      setDataParaCard(new Date())
      setAgendamento({
        meeting_title: '',
        reserve_date: formatData(new Date()),
        virtual_room_id: 0,
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
            <FormInputAgendar handleInputChange={handleInputChange} width="40%" input={agendamento.duracao} campo="Duração" id="duracao" type="time" />
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
        <SalasVirtuais onclick={handleCardChange} tipo={"Virtual"} dataRealizacaoReuniao={agendamento.reserve_date} />

        {/* Botão para enviar o agendamento */}
        <BtnAgendar type="submit" />
      </Center>
    </form >
  )
}
