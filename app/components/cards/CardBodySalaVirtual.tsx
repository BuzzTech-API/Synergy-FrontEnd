'use client'
import { getAvailableTimesVirtual } from "@/app/(privated)/agendar/service/roomSchedules";
import { VirtualRoom } from "@/app/type/rooms";
import { Badge, CardBody, Flex, Text } from "@chakra-ui/react";

type props = {
	capacidade?: number,
	rooms: VirtualRoom,
	onclick?: () => void,
	data: string,
}
function formatarHoraMinuto(dataString: string): string {
	const data = new Date(dataString);
	const horas = data.getHours().toString().padStart(2, '0');
	const minutos = data.getMinutes().toString().padStart(2, '0');
	return `${horas}:${minutos}`;
}
export function CardBodySalaVirtual({ capacidade, rooms, onclick, data }: props) {
	const availableTimes = getAvailableTimesVirtual(rooms, data)

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
							{`${formatarHoraMinuto(time.start)} até ${formatarHoraMinuto(time.end)}`}
						</Badge>
					})
				}
			</Flex>
		</CardBody>
	)
}
