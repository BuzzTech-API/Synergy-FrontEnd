'use client'
import { Text, Flex, Heading} from "@chakra-ui/react";
import { Navbar } from "../../components/Navbar/Navbar";
import TabUsuarios from "@/app/components/tabela/TabUsuarios";

export default function visualizarUsuarios() {

    //Funções para Mostrar os Usuários

    return (
      <main>

            <Navbar.Root>
            <Navbar.Menu />
            <Navbar.Perfil />
            </Navbar.Root>

            <Flex alignItems="center" justifyContent="center" pt="7rem">

                <TabUsuarios></TabUsuarios>

            </Flex>

      </main>
    )
}