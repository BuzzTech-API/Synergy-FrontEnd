
'use client'
import { excluirSala, excluirSalaVirtual } from "@/app/(privated)/visualizarSala/service/excluirSala";
import { Button, CardBody, Flex, Link, Text } from "@chakra-ui/react";
import NextLink from 'next/link'
import {ReactNode } from "react";

type props = {
	capacidade?: number,
	nivelDePermissao: number,
	children: ReactNode
}

export function CardBodySalaAdm({ children, nivelDePermissao, capacidade = 0 }: props) {

	return (
		<CardBody
		>
			{capacidade !== 0 ?
				<Text
					textAlign={"center"}
				>
					Capacidade <br />
					{capacidade} pessoas
				</Text>
				:
				<Link
					as={NextLink}
					href="#"
				><Text
					textAlign={"center"}
				>Link da Sala</Text></Link>
			}
			<Flex
				pt={'0.5rem'}
				alignItems={"center"}
				gap={'0.6rem'}
				mt={capacidade === 0 ? '3.0rem' : '1rem'}
				flexDirection={"column"}
			>
				<Text fontWeight={'bold'}>Nível de Permissão</Text>
				<Text>{nivelDePermissao}</Text>
			</Flex>
			<Flex mt={'2rem'} gap={'1em'} flexDirection={'column'} >
				{children}
			</Flex>
		</CardBody>
	)
}
