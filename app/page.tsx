

'use client'
import { Flex } from "@chakra-ui/react";
import { Navbar } from "./components/Navbar/Navbar";
import { Cards } from "./components/cards";
import { SwitchPV } from "./components/switch/Switch";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Navbar.Root>
        <Navbar.Menu />
        <Navbar.Perfil user='JP' />
      </Navbar.Root>

      <Flex alignSelf={'center'} justifySelf={'center'} justify={"center"} gap={'5px'} width={'100%'} align={'center'} pt={'1em'}>
        <Cards.Root variant="">
          <Cards.Header>Sala 1</Cards.Header>
        </Cards.Root>
      </Flex>
      <div>

        {/* Teste Switch */}
        <SwitchPV />

      </div>
    </main>
  );
}
