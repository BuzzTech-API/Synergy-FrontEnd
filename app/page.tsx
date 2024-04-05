'use client'
import { Flex } from "@chakra-ui/react";
import { Navbar } from "./components/navbar/Navbar";
import TabUsuarios from "./components/tabela/TabUsuarios";

export default function Home() {

  return (
    <main className="flex flex-col items-center">
      <Navbar.Root>
        <Navbar.Menu user='administrador' />
        <Navbar.Perfil user='JP' />
      </Navbar.Root>

      <Flex alignSelf={'center'} justifySelf={'center'} justify={"center"} direction={"column"} gap={'5px'} width={'100%'} align={'center'} pt={'15em'} pb='20em'>
          <TabUsuarios/>
      </Flex>
      <div>

      </div>
    </main>
  );
}
