'use client'
import { BigBtnAgendar } from "../components/buttons/BigBtns/BigBtnAgendar";
import { BigBtnAgendamentos } from "../components/buttons/BigBtns/BigBtnAgendamentos";
import { BigBtnCadSalas } from "../components/buttons/BigBtns/BigBtnCadSalas";
import { BigBtnCadUsuario } from "../components/buttons/BigBtns/BigBtnCadUsuario";
import { BigBtnVisuSalas } from "../components/buttons/BigBtns/BigBtnVisuSalas";
import { BigBtnVisuUsuarios } from "../components/buttons/BigBtns/BigBtnVisuUsuarios";
import { BtnAdicionar2 } from "../components/buttons/BtnAdicionar2";
import { BtnCancelar } from "../components/buttons/IconBtns/BtnDesmarcar&Cancelar";
import { BtnEditar } from "../components/buttons/IconBtns/BtnEditar&Salvar";
import { Navbar } from "../components/Navbar/Navbar";
import { Flex } from "@chakra-ui/react";
import TabUsuarios from "../components/tabela/TabUsuarios";
import { Cards } from "../components/cards";



export default function Home() {

  return (
    <main className="flex flex-col items-center">
      <Navbar.Root>
        <Navbar.Menu />
        <Navbar.Perfil />
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

        <>
          <BtnEditar />
          <BtnCancelar />
        </>
      </div>
    </main>
  );
}
