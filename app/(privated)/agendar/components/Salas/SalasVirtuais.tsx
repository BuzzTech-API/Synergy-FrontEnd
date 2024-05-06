'use client'
import { Box, Flex, Heading, Text, Spacer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GetSalasService, GetSalasVirtuaisService } from "./services/SalasService";
import { Cards } from "@/app/components/cards";
import { MdCoPresent } from "react-icons/md";
import { VirtualRoom } from "@/app/type/rooms";

interface SalasProps {
    tipo: string,
    dataRealizacaoReuniao: string,
    onclick: (id: number) => void,
}

export default function SalasVirtuais({ tipo, dataRealizacaoReuniao, onclick }: SalasProps) {

    const [salasPresenciais, setSalasPresenciais] = useState<VirtualRoom[]>(new Array<VirtualRoom>());
    const [selected, setSelected] = useState(-1)


    useEffect(() => {

        const fetchData = async () => {
            try {

                const salas: VirtualRoom[] = await GetSalasVirtuaisService();
                setSalasPresenciais(salas);
            } catch (error) {
                console.error('Erro ao buscar dados do backend:', error);
            }
        };

        fetchData();

    }, []);

    const renderSalas = (salas: Array<VirtualRoom>) => {

        if (!salas) {
            return null;
        }

        return salas.map((sala, index) => {
            return (
                <Cards.Root selected={index === selected ? true : false} onclick={() => {
                    setSelected((prevState) => index)
                    onclick(sala.virtual_room_id)
                }} variant='virtual' key={index}>

                    {/*Ivan: Este é o Header do Card para salas Physicas*/}
                    <Cards.HeaderVirtual room_name={sala.virtual_room_name} />

                    {sala.reservation && <Cards.BodySalaVirtual onclick={() => {
                        setSelected((prevState) => index)
                        onclick(sala.virtual_room_id)
                    }} rooms={sala} data={dataRealizacaoReuniao} />}
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
