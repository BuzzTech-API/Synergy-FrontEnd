'use client'
import { BtnCancelar } from "../components/buttons/IconBtns/BtnDesmarcar&Cancelar";
import { BtnEditar } from "../components/buttons/IconBtns/BtnEditar&Salvar";
import { Navbar } from "../components/Navbar/Navbar";
import { Flex } from "@chakra-ui/react";
import TabUsuarios from "../components/tabela/TabUsuarios";
import { useSession } from "next-auth/react";
import { BigBtnAgendar } from "../components/buttons/BigBtns/BigBtnAgendar";
import { BigBtnAgendamentos } from "../components/buttons/BigBtns/BigBtnAgendamentos";
import { BigBtnCadSalas } from "../components/buttons/BigBtns/BigBtnCadSalas";
import { BigBtnVisuUsuarios } from "../components/buttons/BigBtns/BigBtnVisuUsuarios";
import { BigBtnCadUsuario } from "../components/buttons/BigBtns/BigBtnCadUsuario";
import { BigBtnVisuSalas } from "../components/buttons/BigBtns/BigBtnVisuSalas";
import Link from "next/link";



export default function Home() {
  const session = useSession();

  return (
    <main className="flex flex-col items-center">
      <Navbar.Root>
        <Navbar.Menu />
        <Navbar.Perfil />
      </Navbar.Root>

      <Flex
        justifySelf={'flex-start'}
        justify={"flex-start"}
        direction={"column"}
        gap={'5px'}
        width={'100%'}
        align={'flex-start'}
        pl={'5rem'}
      >
        <Flex
          width={session.data?.user.user_permission_level === 10 ? '50.625rem' : "14.375rem"}
          flexWrap={'wrap'}
          gap={'4.5rem'}
          pt={'18rem'}>
          <Link href={'/agendar'}><BigBtnAgendar /></Link>
          {session.data?.user.user_permission_level === 10 && (
            <>
              <Link href={'/cadastrarUsuario'}><BigBtnCadUsuario /></Link>
              <Link href={''}><BigBtnVisuUsuarios /></Link>
            </>
          )}
          <Link href={'/meusAgendamentos'}><BigBtnAgendamentos /></Link>
          {session.data?.user.user_permission_level === 10 && (
            <>
              <Link href={'/cadastrarSala'}> <BigBtnCadSalas /></Link>
              <Link href={'/visualizarSala'}><BigBtnVisuSalas /></Link>
            </>
          )}

        </Flex>
      </Flex>

    </main>
  );
}
