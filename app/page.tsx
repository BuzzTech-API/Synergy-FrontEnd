
'use client'
import { Button, Flex } from "@chakra-ui/react";
import { Navbar } from "./components/Navbar/Navbar";
import { Cards } from "./components/cards";

export default function Home() {

  return (
    <main className="flex flex-col items-center">
      <Navbar.Root>
        <Navbar.Menu user='administrador' />
        <Navbar.Perfil user='JP' />
      </Navbar.Root>

      <Flex alignSelf={'center'} justifySelf={'center'} justify={"center"} direction={"column"} gap={'5px'} width={'100%'} align={'center'} pt={'1em'}>
        <Cards.Root variant="presencial">
          <Cards.Header>Sala 1</Cards.Header>
          <Cards.BodySala capacidade={10} />
        </Cards.Root>
        <Cards.Root variant="virtual">
          <Cards.Header>Sala 1</Cards.Header>
          <Cards.BodySala />
        </Cards.Root>
        <Cards.Root variant="virtual">
          <Cards.Header>Sala 1</Cards.Header>
          <Cards.BodySalaAdm nivelDePermissao={3} />
        </Cards.Root>
        <Cards.Root variant="presencial">
          <Cards.Header>Sala 1</Cards.Header>
          <Cards.BodySalaAdm capacidade={10} nivelDePermissao={3} />
        </Cards.Root>
        <Cards.Root variant="deitado">
          <Cards.BodyDeitado nome={"Vanderley da Silva"} email={"Vanderley@email.com"} variant="hybrid" />
        </Cards.Root>
        <Cards.Root variant="presencial">
          <Cards.Header>Reunião</Cards.Header>
          <Cards.BodyReuniao tituloReuniao="lorem ipsum dolor" data="24/12/2024" horaFim="13:00" horaInicio="11:00">
            <Button zIndex={1}> teste </Button>
            <Button zIndex={1}> teste </Button>
          </Cards.BodyReuniao>
        </Cards.Root>
      </Flex>
      <div>

      </div>
    </main>
  );
}
