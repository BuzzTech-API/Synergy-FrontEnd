'use client'
import { Box, Flex, Heading, Text, Spacer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GetSalasService } from "./services/SalasService";
import { Cards } from "@/app/components/cards";
import { PhysicalRooms } from "@/app/type/rooms";

interface SalasProps {
    tipo: string,
    dataRealizacaoReuniao: string,
    onclick: (id: number) => void,
    qntMinima: number
}

export default function Salas({ tipo, dataRealizacaoReuniao, onclick, qntMinima }: SalasProps) {

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
        salas.sort((sala1, sala2) => {
            return sala1.physical_room_vacancies - sala2.physical_room_vacancies
        })
        return salas.map((sala, index) => {
            if (sala.physical_room_vacancies >= qntMinima) {
                return (
                    <Cards.Root selected={index === selected ? true : false} onclick={() => {
                        setSelected((prevState) => index)
                        onclick(sala.physical_room_id)
                    }} variant='presencial' key={index}>

                        {/*Ivan: Este é o Header do Card para salas Physicas*/}
                        <Cards.HeaderPhysical room_name={sala.physical_room_name} />


                        {sala.reservation && <Cards.BodySala onclick={() => {
                            setSelected((prevState) => index)
                            onclick(sala.physical_room_id)
                        }} rooms={sala} data={dataRealizacaoReuniao} capacidade={sala.physical_room_vacancies} />}
                    </Cards.Root>
                );
            }
            else {
                return <></>
            }
        });
    }


    return (

        <Box>
            <Flex
                justifyContent='center'
                alignItems='center'
                h='4rem'
            >

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
