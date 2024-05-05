'use client'
import { Badge, CardBody, Flex, Text } from "@chakra-ui/react";

type props = {
	capacidade?: number,
	reservation: PhysicalRoomReservation
	onclick?: () => void,
}

interface PhysicalRoomReservation {
	physical_room_id: number;
	physical_room_name: string;
	physical_room_permission_level: number;
	physical_room_vacancies: number;
	is_active: boolean;
	reservation: Array<Reserve>
}

interface Reserve {
	reserve_date: Date;
	reserve_start: Date;
	reserve_end: Date;
	reserve_id: number;
}

export function CardBodySala({ capacidade, reservation, onclick}: props) {

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
				<Text fontWeight={'bold'}>Ocupado nos Horários</Text>
				{reservation.reservation.map((reserva, index) =>
					<Badge key={index}>
						{`${new Date(reserva.reserve_start).toLocaleTimeString()} até ${new Date(reserva.reserve_end).toLocaleTimeString()}`}
					</Badge>
				)}
			</Flex>
		</CardBody>
	)
}
