'use client'
import { Text, Flex, Heading} from "@chakra-ui/react";
import { Navbar } from "../../components/Navbar/Navbar";
import SalasVisual from "./components/SalasVisual";
import SalasVisualVirtual from "./components/SalasVisualVirtual";

export default function visualizarSalas() {
  
    return (
      <main>
        <Navbar.Root>
            <Navbar.Menu />
            <Navbar.Perfil />
        </Navbar.Root>

        <Flex flexDir={'column'} pl={'1rem'} pt={'6rem'} gap={'1rem'}>
          
            <Heading>Salas Presenciais</Heading>
            <SalasVisual/> 

            <Heading>Salas Virtuais</Heading>
            <SalasVisualVirtual/> 

        </Flex>
      </main>
    )
}
