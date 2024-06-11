'use client'
import { Button, Flex, Heading } from "@chakra-ui/react";
import { Cards } from "../../components/cards";
import { BtnDesmarcar } from "../../components/buttons/IconBtns/BtnDesmarcar&Cancelar";
import { BtnReagendar } from "../../components/buttons/IconBtns/BtnAgendar&Reagendar";
import { Navbar } from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { Participacao, Reuniao, User } from "@/app/type/user";
import { getUserInTheSession } from "../agendar/service/getUsers";
import { sendEmail } from "./services/sendEmail";
import { mailRecipient } from "@/app/type/emailTypes";
import { getParticipacoes } from "./services/getParticipacoes";
import { gerarHtmlDesmarcarReuniao } from "../templates/templateDesmarcarReuniao/htmlString";
import { deleteReserve } from "./services/deletarReserva";

export default function MeusAgendamentos() {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    async function fetchUser() {
      const response: User = await getUserInTheSession()
      setUser(response)
    }
    fetchUser()
  }, [])

  function formatarData(dataString: string): string {
    const dataUTC = new Date(dataString);
    const dia = dataUTC.getDate().toString().padStart(2, '0');
    const mes = (dataUTC.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataUTC.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  function obterHorasMinutos(dataString: string): string {
    const dataUTC = new Date(dataString);
    const horas = dataUTC.getHours().toString().padStart(2, '0');
    const minutos = dataUTC.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`;
  }


  const preencheReuniaoMarcadas = () => {
    return user?.participate.map((participa, index) => {
      const reservaCriadoPeloUsuario = user.reservations.filter((reservatio) => reservatio.reserve_id === participa.meetings.reservations.reserve_id)

      const handleClickDesmarcar = async () => {
        const listaEmails = await getEmails(participa.meeting_id);

        handleDesmarcar(listaEmails, participa.meetings);
      };

      if (reservaCriadoPeloUsuario.length !== 0) {

        console.log(participa)
        let variante = "reuniao_" + participa.meetings.meeting_type

        return (
          <Cards.Root
            variant= {variante}
            key={participa.meeting_id}
          >
            <Cards.HeaderReunion tipo={participa.meetings.meeting_type}/>
            <Cards.BodyReuniao
              tipo={participa.meetings.meeting_type}
              descricao={participa.meetings.meeting_subject}
              tituloReuniao={participa.meetings.meeting_title}
              data={formatarData(participa.meetings.reservations.reserve_date)}
              horaInicio={obterHorasMinutos(participa.meetings.reservations.reserve_start)}
              horaFim={obterHorasMinutos(participa.meetings.reservations.reserve_end)}>
              <BtnReagendar />
              <BtnDesmarcar onClick={handleClickDesmarcar} />
            </Cards.BodyReuniao>
          </Cards.Root>
        )
      }
      return null;
    })
  }

  const getEmails = async (meeting_id: number) => {
    try {
      const listaDeParticipacoes = await getParticipacoes(meeting_id);
      const listaRecipientesEmail: Array<mailRecipient> = [];

      listaDeParticipacoes.forEach((participacao: Participacao) => {
        const recipienteEmail = {
          name: participacao.user.user_name,
          address: participacao.user.user_email
        }
        listaRecipientesEmail.push(recipienteEmail)
      });

      return listaRecipientesEmail;

    } catch (error) {
      console.log(error);
      return [];
    }
  }

  const handleDesmarcar = async (recipientesEmail: Array<mailRecipient>, meeting: Reuniao) => {

    if (recipientesEmail) {
      
      const htmlAviso = `A reunião ${meeting.meeting_title} foi desmarcada pelo criador da reunião!`;
      const htmlInformacoesReuniao = `
                <h3 class="v-text-align" style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 13px; font-weight: 400;"><span><strong>Título da reunião: </strong></span></h3>
                <p style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 11px;">${meeting.meeting_title}</p>
                <h3 class="v-text-align" style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 13px; font-weight: 400;"><span><strong>Tipo da reunião: </strong></span></h3>
                <p style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 11px;">${meeting.meeting_type}</p>
                <h3 class="v-text-align" style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 13px; font-weight: 400;"><span><strong>Assunto da reunião: </strong></span></h3>
                <p style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 11px;">${meeting.meeting_subject}</p>
                <h3 class="v-text-align" style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 13px; font-weight: 400;"><span><strong>Data da reunião: </strong></span></h3>
                <p style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 11px;">${formatarData(meeting.reservations.reserve_date)}</p>
                <h3 class="v-text-align" style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 13px; font-weight: 400;"><span><strong>Horário de início: </strong></span></h3>
                <p style="margin: 0px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 11px;">${obterHorasMinutos(meeting.reservations.reserve_start)}</p>`;

      const html = gerarHtmlDesmarcarReuniao(htmlAviso, htmlInformacoesReuniao);

      const argumentosSendEmail = {
        recipients: recipientesEmail,
        subject: meeting.meeting_subject,
        html: html,
      };

      await sendEmail(argumentosSendEmail);

      const deleteResponse = await deleteReserve(meeting.reservations.reserve_id);
      console.log('Resposta de deleteReserve:', deleteResponse); 
      
    } else {
      console.error('Não foi possível obter os emails dos participantes.');
    }
  };

  const preencheReuniaoParticipante = () => {
    return user?.participate.map((participa, index) => {
      const reservaCriadoPeloUsuario = user.reservations.filter((reservatio) => reservatio.reserve_id === participa.meetings.reservations.reserve_id)
      if (reservaCriadoPeloUsuario.length === 0) {
        let variante = "reuniao_" + participa.meetings.meeting_type
        return (
          <Cards.Root
            variant={variante}
            key={participa.meeting_id}
          >
            <Cards.HeaderReunion />
            <Cards.BodyReuniao
              tipo={participa.meetings.meeting_type}
              descricao={participa.meetings.meeting_subject}
              tituloReuniao={participa.meetings.meeting_title}
              data={formatarData(participa.meetings.reservations.reserve_date)}
              horaInicio={obterHorasMinutos(participa.meetings.reservations.reserve_start)}
              horaFim={obterHorasMinutos(participa.meetings.reservations.reserve_end)}>
              <BtnDesmarcar />
            </Cards.BodyReuniao>
          </Cards.Root>
        )
      }
      return null;
    })
  }


  return (
    <main>
      <Navbar.Root>
        <Navbar.Menu />
        <Navbar.Perfil />
      </Navbar.Root>
      <Flex flexDir={'column'} pl={'1rem'} pt={'4.85rem'} gap={'0.4rem'}>
        <Heading>Reuniões Marcadas</Heading>
        <Flex overflowY={'auto'} pb={'0.3rem'} gap={'1rem'}>
          {preencheReuniaoMarcadas()}
        </Flex>
        <Heading>Reuniões como participante</Heading>
        <Flex pb={'0.3rem'} overflowY={'auto'} gap={'1rem'}>
          {preencheReuniaoParticipante()}
        </Flex>
      </Flex>
    </main>
  )
}
