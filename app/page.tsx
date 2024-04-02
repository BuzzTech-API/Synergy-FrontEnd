

'use client'
import { Flex } from "@chakra-ui/react";
import { Navbar } from "./components/Navbar/Navbar";
import { Card } from "./components/cards/CardOne";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Navbar.Root>
        <Navbar.Menu />
        <Navbar.Perfil user='JP' />
      </Navbar.Root>

      <Flex alignSelf={'center'} justifySelf={'center'} justify={"center"} width={'100%'} align={'center'}>
        <Card>
          qualquer coisa
        </Card>
      </Flex>
    </main>
  );
}
