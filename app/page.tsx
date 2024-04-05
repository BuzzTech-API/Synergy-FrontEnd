'use client'
import { Flex } from "@chakra-ui/react";
import { Navbar } from "./components/Navbar/Navbar";
import TabUsuarios from "./components/tabela/TabUsuarios";
import { Cards } from "./components/cards";

export default function Home() {

  return (
    <main className="flex flex-col items-center">
      <Navbar.Root>
        <Navbar.Menu user='administrador' />
        <Navbar.Perfil user='JP' />
      </Navbar.Root>

      <Flex alignSelf={'center'} justifySelf={'center'} justify={"center"} direction={"column"} gap={'5px'} width={'100%'} align={'center'} pt={'8em'} pb='20em'>
        <TabUsuarios />
        {/* <Cards.Root>
            <Cards.Header>
              Teste
            </Cards.Header>
            <Cards.BodySala/>
          </Cards.Root> */}
      </Flex>
      <div>

      </div>
    </main>
  );
}
