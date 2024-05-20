'use client'
import { Text, Flex, Heading} from "@chakra-ui/react";
import { Navbar } from "../../components/Navbar/Navbar";
import SalasVirtuais from "./Salas/SalasVirtuais";
import SalasVisual from "./components/SalasVisual";
import SalasVisualVirtual from "./components/SalasVisualVirtual";

export default function visualizarSalas() {

    //Funções para Mostrar as Salas Criadas

    return (
      <main>
        <Navbar.Root>
            <Navbar.Menu />
            <Navbar.Perfil />
        </Navbar.Root>

        <Flex flexDir={'column'} pl={'1rem'} pt={'6rem'} gap={'1rem'}>
          
            <Heading>Salas Presenciais</Heading>
            <SalasVisual tipo={"Presencial"}/> 

            <Heading>Salas Virtuais</Heading>
            <SalasVisualVirtual tipo={"Virtual"}/> 

        </Flex>
      </main>
    )
  }