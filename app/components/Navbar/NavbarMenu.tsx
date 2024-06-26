'use client'
import { IconButton, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import NavbarOptionsMenu from "./NavbarOptionsMenu";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { DrawerUserUpdate } from "../DrawerUserUpdate";


export default function NavbarMenu() {

    async function deslogar() {
        await signOut()
    }


    const { data: session } = useSession();


    const renderMenuItems = () => {
        if (session?.user.user_permission_level === 10) {
            return (
                <>
                    <Link href={'/'}><NavbarOptionsMenu hasCorFundo={true} texto='Tela Inicial' /></Link>
                    <Link href={'/agendar'}><NavbarOptionsMenu hasCorFundo={false} texto='Agendar' /></Link>
                    <Link href={'/meusAgendamentos'} > <NavbarOptionsMenu hasCorFundo={true} texto='Meus Agendamentos' /></Link>
                    <Link href={'/cadastrarSala'} > <NavbarOptionsMenu hasCorFundo={false} texto='Cadastrar Sala' /></Link>
                    <Link href={'/cadastrarUsuario'}><NavbarOptionsMenu hasCorFundo={true} texto='Cadastrar Usuário' /></Link>
                    <Link href={'/visualizarSala'} ><NavbarOptionsMenu hasCorFundo={false} texto='Visualizar Salas' /></Link>
                    <Link href={'/visualizarUsuarios'} ><NavbarOptionsMenu hasCorFundo={true} texto='Visualizar Usuários' /></Link>
                    <DrawerUserUpdate />
                    <NavbarOptionsMenu onClick={() => deslogar()} hasCorFundo={true} texto='Sair' />

                </>
            );
        } else {
            return (
                <>
                    <Link href={'/'}><NavbarOptionsMenu hasCorFundo={true} texto='Tela Inicial' /></Link>
                    <Link href={'/agendar'} > <NavbarOptionsMenu hasCorFundo={false} texto='Agendar' /></Link>
                    <Link href={'/meusAgendamentos'} > <NavbarOptionsMenu hasCorFundo={true} texto='Meus Agendamentos' /></Link>
                    <Link href={''} > <NavbarOptionsMenu hasCorFundo={false} texto='Editar Perfil' /></Link>
                    <NavbarOptionsMenu onClick={() => deslogar()} hasCorFundo={true} texto='Sair' />
                </>
            );
        }
    };

    if (session && session.user)

        return (
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label='menu'
                    boxShadow={'none'}
                    icon={<GiHamburgerMenu size='2.0rem' />}
                    _hover={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                    _expanded={{ bg: 'blue.300', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                    border='1px solid black'
                    borderRadius={'0.2rem'}
                    bg='none'
                    h='3.0rem'
                    w='3.0rem'
                />
                <MenuList p='0' boxShadow="0px 1px 2px rgba(0, 0, 0, 0.25)">
                    {renderMenuItems()}
                </MenuList>
            </Menu>
        );

}
