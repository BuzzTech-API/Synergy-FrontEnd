'use client'
import { CardHeader, Flex, Text, Box, Spacer} from "@chakra-ui/react";
import { MdLaptopMac } from "react-icons/md";

type props = {
	room_name: string // Nome da sala para ser exibido no cabeçalho.
}

/** Ivan Germano:
 * Componente funcional que renderiza um cabeçalho de cartão para uma sala virtual.
 * Inclui um ícone representativo e o nome da sala.
 * @param {props} props - Objeto contendo as propriedades do componente.
 * @param {string} props.room_name - Nome da sala a ser exibido.
 */
export function CardVirtualHeader({room_name}: props) {
	return (
        <CardHeader>
            <Flex align='center'>
                <Box>
                <MdLaptopMac fontSize="2.5rem"/>                  {/* Ícone representativo da Sala Virtual */}
                </Box>
                <Spacer/>                                         {/* Espaçador para centralizar o nome da sala entre os espaços */}
                <Box>
                    <Text fontSize="1.5rem">{room_name}</Text>    {/* Exibe o nome da sala */} 
                </Box>
                <Spacer/>                                         {/* Espaçador para manter o layout balanceado e o nome da sala centralizado*/}
            </Flex> 
        </CardHeader>
	)
}