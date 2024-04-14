
'use client'
import { Button, CardBody, Center, Flex, Heading, Link, Text } from "@chakra-ui/react";
import NextLink from 'next/link'
import { ReactNode } from "react";
type props = {
	tituloReuniao: string,
	children: ReactNode,
	data: string,
	horaInicio: string,
	horaFim: string,
}

export function CardBodyReuniao({ tituloReuniao, children, data, horaInicio, horaFim }: props) {


	return (
		<CardBody
			position={'relative'}
			zIndex={3}
			mt={'-2rem'}
		>
			<Center
				flexDirection={'column'}
			>

				<Text
					textAlign={"center"}
				>
					{tituloReuniao}
				</Text>
				<Flex
					pt={'0.3rem'}
					alignItems={"center"}
					gap={'0.3rem'}
					flexDirection={"column"}
				>
					<Heading fontSize={'1rem'}>Data</Heading>
					<Text >{data}</Text>
				</Flex>
				<Flex
					pt={'0.3rem'}
					alignItems={"center"}
					gap={'0.3rem'}
					flexDirection={"column"}
				>
					<Heading fontSize={'1rem'}>Horário de Inicio</Heading>
					<Text>{horaInicio}</Text>
				</Flex>
				<Flex
					pt={'0.3rem'}
					alignItems={"center"}
					gap={'0.3rem'}
					flexDirection={"column"}
				>
					<Heading fontSize={'1rem'}>Horário de Fim</Heading>
					<Text>{horaFim}</Text>
				</Flex>
				<Flex mt={'0.5rem'} gap={'0.4em'} zIndex={'3'} flexDirection={'column'} >
					{children}
				</Flex>
			</Center>
		</CardBody>
	)
}
