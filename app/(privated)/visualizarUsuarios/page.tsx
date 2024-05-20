'use client'
import { Text, Flex, Heading} from "@chakra-ui/react";
import { Navbar } from "../../components/Navbar/Navbar";


export default function visualizarUsuarios() {

    //Funções para Mostrar os Usuários

    return (
      <main>
        <Navbar.Root>
            <Navbar.Menu />
            <Navbar.Perfil />
        </Navbar.Root>
      </main>
    )
}