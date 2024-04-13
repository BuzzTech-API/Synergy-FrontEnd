'use client'

import { Flex, Text, Heading, CardBody, Button } from "@chakra-ui/react"
import { useState } from "react"
import { SwitchPV } from "../switch/Switch"

type props = {
	nome: string,
	email: string,
	variant?: string,
}

export function CardBodyDeitado({ nome, email, variant = 'presencial' }: props) {
	const [hybrid, setHybrido] = useState(variant === 'presencial' ? false : true)
	let color = ''
	if (!hybrid)
		color = '#FFA800';
	else
		color = '#13ACEE'

	return (
		<CardBody
		>
			<Flex justifyContent={'space-between'} alignItems={'center'} >
				<Flex flexDirection={'column'}>
					<Heading fontSize="1.5rem" display={'flex'} transition={'all 400ms ease'} color={color}>{nome}</Heading>
					<Text display={'flex'}>{email}</Text>
				</Flex>
				{variant === 'hybrid' && (
					<Flex alignItems={'center'} gap={'0.3rem'}>
						<Text>Presencial</Text>
						<SwitchPV onChange={() => setHybrido((state) => !state)} />
						<Text>Virtual</Text>
					</Flex>
				)}
				<Button bgColor={"red"}>Remover</Button>
			</Flex>
		</CardBody>
	)
}

