'use client'
import { Box, Flex} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GetSalasVirtuaisService } from "../../agendar/components/Salas/services/SalasService";
import { Cards } from "@/app/components/cards";
import { VirtualRoom } from "@/app/type/rooms";

interface SalasProps {
    tipo: string,
}

export default function SalasVisualVirtual({ tipo}: SalasProps) {

    const [SalasVirtuais, setSalasVirtuais] = useState<VirtualRoom[]>(new Array<VirtualRoom>());


    useEffect(() => {

        const fetchData = async () => {
            try {

                const salas: VirtualRoom[] = await GetSalasVirtuaisService();
                setSalasVirtuais(salas);
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
                <Cards.Root variant='virtual' key={index}>

                    {/*Ivan: Este é o Header do Card para salas Virtuais*/}
                    <Cards.HeaderVirtual room_name={sala.virtual_room_name} />
                    {<Cards.BodySalaAdm  nivelDePermissao={sala.virtual_room_permission_level} capacidade={0} />}
                </Cards.Root>
            );
        });
    }

    return (
        <Box>
            <Flex
                w='100%'
                wrap='wrap'
                gap='3rem'>

                {renderSalas(SalasVirtuais)}

            </Flex>
        </Box>

    )
}
