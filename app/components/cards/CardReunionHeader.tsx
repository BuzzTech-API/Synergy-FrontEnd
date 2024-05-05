'use client'
import { CardHeader, Flex, Text, Box} from "@chakra-ui/react";
import { HiUserGroup } from "react-icons/hi2";

/** Ivan Germano:
 * Componente funcional que renderiza um cabeçalho de cartão para reuniões.
 * Este cabeçalho inclui um ícone que representa um grupo de usuários e o texto "Reunião".
 * O conteúdo é centralizado horizontal e verticalmente no cabeçalho.
 */

export function CardReunionHeader() {
	return (
        <CardHeader>
            <Flex justifyContent="center" align="center">
                <HiUserGroup />                             {/* Ícone representando um grupo de usuários */}
                <Text ml={2}>Reunião</Text>                 {/* Texto indicando o propósito do cartão */}
            </Flex>
        </CardHeader>
	)
}
