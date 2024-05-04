'use client'
import { Box, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GetSalasService } from "./services/SalasService";
import { Cards } from "@/app/components/cards";
import { PhysicalRooms } from "@/app/type/rooms";

interface SalasProps {
    tipo: string,
    dataRealizacaoReuniao: string,
    onclick: (id: number) => void,
}

export default function Salas({ tipo, dataRealizacaoReuniao, onclick }: SalasProps) {

    const [salasPresenciais, setSalasPresenciais] = useState<PhysicalRooms[]>(new Array<PhysicalRooms>());
    const [selected, setSelected] = useState(-1)


    useEffect(() => {

        const fetchData = async () => {
            try {

                const salas: PhysicalRooms[] = await GetSalasService();
                setSalasPresenciais(salas);
            } catch (error) {
                console.error('Erro ao buscar dados do backend:', error);
            }
        };

        fetchData();

    }, []);

    const renderSalas = (salas: Array<PhysicalRooms>) => {

        if (!salas) {
            return null;
        }

        return salas.map((sala, index) => {
            return (
                <Cards.Root selected={index === selected ? true : false} onclick={() => {
                    setSelected((prevState) => index)
                    onclick(sala.physical_room_id)
                }} variant='presencial' key={index}>
                    <Cards.Header
                        fontSize="1.5rem"
                        onClick={() => {
                            setSelected((prevState) => index)
                            onclick(sala.physical_room_id)
                        }}
                    >{sala.physical_room_name}</Cards.Header>
                    {sala.reservation && <Cards.BodySala onclick={() => {
                        setSelected((prevState) => index)
                        onclick(sala.physical_room_id)
                    }} rooms={sala} data={dataRealizacaoReuniao} capacidade={sala.physical_room_vacancies} />}
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

                {renderSalas(salasPresenciais)}

            </Flex>

        </Box>

    )
}
