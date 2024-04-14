'use client'
import { Center, Heading, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import React from "react"
import { Navbar } from "../../components/Navbar/Navbar"
import FormularioPresencial from "./components/formularioPresencial"
import Salas from "./components/Salas/Salas"
import FormIndividual from "./components/formIndividual"


export default function AgendarPage() {
  const [radioTipo, setRadioTipo] = React.useState('0')
  const [radioModo, setRadioModo] = React.useState('')
  const [radioIndividual, setRadioIndividual] = React.useState('0')
  return (
    <main>
      <Navbar.Root>
        <Navbar.Menu />
        <Navbar.Perfil />
      </Navbar.Root>
      <Center pt={'6.5rem'} flexDir={'column'} gap={'1rem'}>
        <Heading>Tipo de Reunião</Heading>
        <RadioGroup onChange={setRadioTipo} value={radioTipo}>
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
        {radioIndividual === 'somenteSala' && (<FormIndividual/>)}


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
      </Center>
    </main>
  )

} 
