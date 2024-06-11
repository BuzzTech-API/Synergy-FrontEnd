'use client'
import { CardHeader, Flex, Text, Box} from "@chakra-ui/react";
import { HiUserGroup} from "react-icons/hi2";
import { GiLaptop } from "react-icons/gi";
import { RiHomeOfficeFill } from "react-icons/ri";

/** Ivan Germano:
 * Componente funcional que renderiza um cabeçalho de cartão para reuniões.
 * Este cabeçalho inclui um ícone que representa um grupo de usuários e o texto "Reunião".
 * O conteúdo é centralizado horizontal e verticalmente no cabeçalho.
 */

type props = {
	tipo: string,
}

export function CardReunionHeader({tipo}: props) {
    if (tipo === "Presencial"){
        return (
            <CardHeader>
                <Flex justifyContent="center" align="center">
                    <HiUserGroup />                                        {/* Ícone representando um grupo de usuários */}
                    <Text ml={2}>Reunião Presencial</Text>                 {/* Texto indicando o propósito do cartão */}
                </Flex>
            </CardHeader>
        )
    } else if (tipo === "Virtual") {
        return (
            <CardHeader>
                <Flex justifyContent="center" align="center">
                    <GiLaptop />                            {/* Ícone representando um grupo de usuários */}
                    <Text ml={2}>Reunião Virtual</Text>                 {/* Texto indicando o propósito do cartão */}
                </Flex>
            </CardHeader>
        )
    } else {
        return (
            <CardHeader>
                <Flex justifyContent="center" align="center">
                    <RiHomeOfficeFill />                             {/* Ícone representando um grupo de usuários */}
                    <Text ml={2}>Reunião Híbrida</Text>                 {/* Texto indicando o propósito do cartão */}
                </Flex>
            </CardHeader>
        )
    }
}
