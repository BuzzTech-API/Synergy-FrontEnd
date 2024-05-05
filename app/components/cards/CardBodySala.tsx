'use client'
import getAvailableTimes from "@/app/(privated)/agendar/service/roomSchedules";
import { PhysicalRooms } from "@/app/type/rooms";
import { Badge, CardBody, Flex, Text } from "@chakra-ui/react";

type props = {
	capacidade?: number,
	rooms: PhysicalRooms,
	onclick?: () => void,
	data: string,
}

export function CardBodySala({ capacidade, rooms, onclick, data }: props) {
	const availableTimes = getAvailableTimes(rooms, data)

	return (
		<CardBody onClick={onclick}>
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
				<Text fontWeight={'bold'}>Horários Disponíveis</Text>
				{
					availableTimes.availableTimes.map((time, index) => {
						return <Badge key={index}>
							{`${time.start} até ${time.end}`}
						</Badge>
					})
				}
			</Flex>
		</CardBody>
	)
}
