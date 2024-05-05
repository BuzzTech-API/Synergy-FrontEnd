'use client'
import { Box, Flex, Heading, Text, Spacer} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GetReservationSalaService, GetSalasService } from "./services/SalasService";
import { Cards } from "@/app/components/cards";
import { MdCoPresent } from "react-icons/md";

interface SalasProps {
    tipo: string,
    dataRealizacaoReuniao: Date,
    onclick: (id: number) => void,
}

interface PhysicalRoom {
    physical_room_id: number;
    physical_room_name: string;
    physical_room_permission_level: number;
    physical_room_vacancies: number;
    is_active: boolean;
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



export default function Salas({ tipo, dataRealizacaoReuniao, onclick }: SalasProps) {

    const [salasPresenciais, setSalasPresenciais] = useState<PhysicalRoom[]>(new Array<PhysicalRoom>());
    const [reservas, setReservas] = useState<PhysicalRoomReservation[]>(new Array<PhysicalRoomReservation>());
    const [selected, setSelected] = useState(-1)


    useEffect(() => {

        const fetchData = async () => {
            try {

                const salas: PhysicalRoom[] = await GetSalasService();
                setSalasPresenciais(salas);

                const reservationsPromises = salas.map(sala => GetReservationSalaService(sala.physical_room_id));
                const reservationsData = await Promise.all(reservationsPromises);
                setReservas(reservationsData);

            } catch (error) {
                console.error('Erro ao buscar dados do backend:', error);
            }
        };

        fetchData();

    }, []);

    const renderSalas = (salas: Array<PhysicalRoom>, reservas: Array<PhysicalRoomReservation>) => {

        if (!salas || !reservas) {
            return null;
        }

        return salas.map((sala, index) => {
            const reserva: PhysicalRoomReservation | undefined = reservas.find(reserva => reserva.physical_room_id === sala.physical_room_id);
            return (
                <Cards.Root selected={index === selected ? true : false} onclick={() => {
                    setSelected((prevState) => index)
                    onclick(sala.physical_room_id)
                }} variant='presencial' key={index}>

                    {/*Ivan: Este é o Header do Card para salas Physicas*/}
                    <Cards.HeaderPhysical room_name={sala.physical_room_name}/>

                    {reserva && <Cards.BodySala onclick={() => {
                        setSelected((prevState) => index)
                        onclick(sala.physical_room_id)
                    }} reservation={reserva} capacidade={sala.physical_room_vacancies} />}
                </Cards.Root>
            );
        });
    }


    return (

        <Box>
            <Flex
                justifyContent='center'
                alignItems='center'
                h='4rem'>
                <Heading>Salas {tipo}</Heading>
            </Flex>
            <Flex
                w='64rem'
                wrap='wrap'
                gap='3rem'>

                {renderSalas(salasPresenciais, reservas)}

            </Flex>

        </Box>

    )
}
