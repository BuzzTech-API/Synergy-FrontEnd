'use client'
import { BtnCancelar } from "../components/buttons/IconBtns/BtnDesmarcar&Cancelar";
import { BtnEditar } from "../components/buttons/IconBtns/BtnEditar&Salvar";
import { Navbar } from "../components/Navbar/Navbar";
import { Flex } from "@chakra-ui/react";
import TabUsuarios from "../components/tabela/TabUsuarios";



export default function Home() {

  return (
    <main className="flex flex-col items-center">
      <Navbar.Root>
        <Navbar.Menu />
        <Navbar.Perfil />
      </Navbar.Root>

      <Flex alignSelf={'center'} justifySelf={'center'} justify={"center"} direction={"column"} gap={'5px'} width={'100%'} align={'center'} pt={'8em'} pb='20em'>
        <TabUsuarios />
      </Flex>

    </main>
  );
}
