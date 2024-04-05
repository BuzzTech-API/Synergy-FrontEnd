
'use client'
import { Button, CardBody, Flex, Link, Text } from "@chakra-ui/react";
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
				<Text fontWeight={'bold'}>Data</Text>
				<Text>{data}</Text>
			</Flex>
			<Flex
				pt={'0.3rem'}
				alignItems={"center"}
				gap={'0.3rem'}
				flexDirection={"column"}
			>
				<Text fontWeight={'bold'}>Horário de Inicio</Text>
				<Text>{horaInicio}</Text>
			</Flex>
			<Flex
				pt={'0.3rem'}
				alignItems={"center"}
				gap={'0.3rem'}
				flexDirection={"column"}
			>
				<Text fontWeight={'bold'}>Horário de Fim</Text>
				<Text>{horaFim}</Text>
			</Flex>
			<Flex mt={'0.5rem'} gap={'0.4em'} flexDirection={'column'} >
				{children}
			</Flex>
		</CardBody>
	)
}
