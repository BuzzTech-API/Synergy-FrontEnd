'use client'
import { Button, Center, Heading, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import React from "react"
import { Navbar } from "../../components/Navbar/Navbar"
import FormularioPresencial from "./components/formularioPresencial"
import FormIndividual from "./components/formIndividual"
import FormularioVirtual from "./components/formularioVirtual"
import FormularioHibrido from "./components/FormularioHibrido"
import Link from "next/link"


export default function AgendarPage() {
  const [radioTipo, setRadioTipo] = React.useState('0')
  const [radioModo, setRadioModo] = React.useState('')
  const [radioIndividual, setRadioIndividual] = React.useState('0')

  let zoom_access_token
  let zoom_refresh_token
  if (typeof window !== "undefined") {

    zoom_access_token = localStorage.getItem("zoom_access_token")
    zoom_refresh_token = localStorage.getItem("zoom_refresh_token")
  }

  const handleRadioTipo = (nextValue: string) => {
    setRadioTipo(nextValue)
    setRadioModo('')
    setRadioIndividual('')
  }
  return (
    <main>
      <Navbar.Root>
        <Navbar.Menu />
        <Navbar.Perfil />
      </Navbar.Root>
      <Center pt={'6.5rem'} flexDir={'column'} gap={'1rem'}>
        <Heading>Tipo de Reunião</Heading>
        <RadioGroup onChange={handleRadioTipo} id="radioTipo" value={radioTipo}>
          <Stack direction='row'>
            <Radio value='grupo' colorScheme={'orange'} bgColor={"gray"} borderColor={'gray'} >Grupo</Radio>
            <Radio value='individual' colorScheme={'orange'} bgColor={"gray"} borderColor={'gray'} >Indivindual</Radio>
          </Stack>
        </RadioGroup>

        {radioTipo === 'individual' && (<>
          <Heading>Tipo de agendamento</Heading>
          <RadioGroup onChange={setRadioIndividual} value={radioIndividual}>
            <Stack direction='row'>
              <Radio value='somenteSala' colorScheme={'orange'} bgColor={"gray"} borderColor={'gray'} >Somente reserva de sala</Radio>
              <Radio value='reuniaoCompleta' colorScheme={'orange'} bgColor={"gray"} borderColor={'gray'} >Agendar reunião completa</Radio>
            </Stack>
          </RadioGroup></>)}
        {radioIndividual === 'somenteSala' && (<FormIndividual />)}


        {/* Espaço para Reunião completa */}
        {radioIndividual === 'reuniaoCompleta' && (<> </>)}

        {radioTipo === 'grupo' && (<>
          <Heading>Formato de Reunião</Heading>
          <RadioGroup onChange={setRadioModo} value={radioModo}>
            <Stack direction='row'>
              <Radio value='Presencial' colorScheme={'orange'} bgColor={"gray"} borderColor={'gray'} >Presencial</Radio>
              <Radio value='Híbrido' colorScheme={'orange'} bgColor={"gray"} borderColor={'gray'} >Híbrido</Radio>
              <Radio value='Virtual' colorScheme={'orange'} bgColor={"gray"} borderColor={'gray'} >Virtual</Radio>
            </Stack>
          </RadioGroup></>)}
        {radioModo === 'Presencial' && (<FormularioPresencial />)}
        {radioModo === 'Híbrido' && (zoom_access_token !== null || zoom_refresh_token !== null) && (<FormularioHibrido />)}
        {radioModo === 'Híbrido' && (zoom_access_token === null && zoom_refresh_token === null) && (<Link href={`https://zoom.us/oauth/authorize?response_type=code&client_id=SfOs6_WBQI2fXXh6TnkfZg&redirect_uri=http://localhost:3000/zoomAuth`}>
          <Button
            p={"1.5rem"}
            width={"14rem"}
            bgColor={"#a87bc7"}
            color={"white"}
            fontWeight={700}
            fontFamily="Poppins"
            fontSize={"1.3rem"}
          >Realizar Autenticação</Button>

        </Link>)}
        {radioModo === 'Virtual' && (zoom_access_token !== null || zoom_refresh_token !== null) && (<FormularioVirtual />)}
        {radioModo === 'Virtual' && (zoom_access_token === null && zoom_refresh_token === null) && (<Link href={`https://zoom.us/oauth/authorize?response_type=code&client_id=SfOs6_WBQI2fXXh6TnkfZg&redirect_uri=http://localhost:3000/zoomAuth`}>
          <Button
            p={"1.5rem"}
            width={"14rem"}
            bgColor={"#a87bc7"}
            color={"white"}
            fontWeight={700}
            fontFamily="Poppins"
            fontSize={"1.3rem"}
          >Realizar Autenticação</Button>

        </Link>)}
      </Center>
    </main>
  )

} 
