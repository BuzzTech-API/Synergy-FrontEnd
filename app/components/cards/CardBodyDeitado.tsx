'use client'

import { Flex, Text, Heading, CardBody, Button } from "@chakra-ui/react"
import { useState } from "react"
import { SwitchPV } from "../switch/Switch"
import { BtnRemover } from "../buttons/IconBtns/BtnRemover&Entrar"

type props = {
	nome: string,
	email: string,
	variant?: string,
	onClick?: () => void
}

export function CardBodyDeitado({ nome, email, variant = 'presencial', onClick }: props) {
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
				<BtnRemover onClick={onClick} />
			</Flex>
		</CardBody>
	)
}

