
'use client'
import { Button, CardBody, Flex, Link, Text } from "@chakra-ui/react";
import NextLink from 'next/link'
type props = {
	capacidade?: number,
	nivelDePermissao: number
}

export function CardBodySalaAdm({ nivelDePermissao, capacidade = 0 }: props) {


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
				<Button zIndex={1}>Alterar</Button>
				<Button zIndex={1}>Remover</Button>
			</Flex>
		</CardBody>
	)
}
