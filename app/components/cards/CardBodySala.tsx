'use client'
import { Badge, CardBody, Flex, Text } from "@chakra-ui/react";

type props = {
	capacidade?: number,
}

export function CardBodySala({ capacidade = 0 }: props) {


	return (
		<CardBody>
			{capacidade !== 0 &&
				<Text
					textAlign={"center"}
				>
					Capacidade <br />
					{capacidade} pessoas
				</Text>
			}
			<Flex
				pt={'0.5rem'}
				width="11.875rem"
				h={"13.5rem"}
				alignItems={"center"}
				gap={'0.6rem'}
				mt={capacidade === 0 ? '3.0rem' : 0}
				flexDirection={"column"}
				overflowY={'auto'}
			>
				<Text fontWeight={'bold'}>Ocupado nos Horários</Text>
				<Badge>18:00 até 22:00</Badge>
				<Badge>18:00 até 22:00</Badge>
				<Badge>18:00 até 22:00</Badge>
				<Badge>18:00 até 22:00</Badge>
			</Flex>
		</CardBody>
	)
}
