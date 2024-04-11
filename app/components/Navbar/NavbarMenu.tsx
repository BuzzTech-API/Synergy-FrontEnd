'use client'

import { IconButton, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import NavbarOptionsMenu from "./NavbarOptionsMenu";
import Link from "next/link";

interface NavbarMenuProps {
    user: String
}

export default function NavbarMenu({ user }: NavbarMenuProps) {

    const renderMenuItems = () => {
        if (user === 'administrador') {
            return (
                <>
                    <Link href={'/'}><NavbarOptionsMenu hasCorFundo={true} texto='Tela Inicial' /></Link>
                    <Link href={'/agendar'}><NavbarOptionsMenu hasCorFundo={false} texto='Agendar' /></Link>
                    <Link href={'/meusAgendamentos'} > <NavbarOptionsMenu hasCorFundo={true} texto='Meus Agendamentos' /></Link>
                    <Link href={''} > <NavbarOptionsMenu hasCorFundo={false} texto='Cadastrar Sala' /></Link>
                    <Link href={'/cadastrarUsuario'}><NavbarOptionsMenu hasCorFundo={true} texto='Cadastrar Usuário' /></Link>
                    <Link href={''} ><NavbarOptionsMenu hasCorFundo={false} texto='Visualizar Salas' /></Link>
                    <Link href={''} ><NavbarOptionsMenu hasCorFundo={true} texto='Visualizar Usuários' /></Link>
                    <Link href={''} > <NavbarOptionsMenu hasCorFundo={false} texto='Editar Perfil' /></Link>
                    <Link href={''} > <NavbarOptionsMenu hasCorFundo={true} texto='Sair' /></Link>
                </>
            );
        } else if (user === 'comum') {
            return (
                <>
                    <Link href={'/'}><NavbarOptionsMenu hasCorFundo={true} texto='Tela Inicial' /></Link>
                    <Link href={'/agendar'} > <NavbarOptionsMenu hasCorFundo={false} texto='Agendar' /></Link>
                    <Link href={'/meusAgendamentos'} > <NavbarOptionsMenu hasCorFundo={true} texto='Meus Agendamentos' /></Link>
                    <Link href={''} > <NavbarOptionsMenu hasCorFundo={false} texto='Editar Perfil' /></Link>
                    <Link href={''} > <NavbarOptionsMenu hasCorFundo={true} texto='Sair' /></Link>
                </>
            );
        }
    };

    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label='menu'
                icon={<GiHamburgerMenu size='3rem' />}
                _hover={{ bg: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                _expanded={{ bg: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
                border='none'
                bg='none'
                h='35px'
                w='35px'
            />
            <MenuList p='0' boxShadow="0px 1px 2px rgba(0, 0, 0, 0.25)">
                {renderMenuItems()}
            </MenuList>
        </Menu>
    );

}
