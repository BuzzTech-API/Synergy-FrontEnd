'use client'
import { Box, Flex} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GetSalasService } from "../../agendar/components/Salas/services/SalasService";
import { Cards } from "@/app/components/cards";
import { PhysicalRooms } from "@/app/type/rooms";

interface SalasProps {
    tipo: string,
}

export default function SalasVisual({ tipo}: SalasProps) {

    const [salasPresenciais, setSalasPresenciais] = useState<PhysicalRooms[]>(new Array<PhysicalRooms>());


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
            {
                return (
                    <Cards.Root variant='presencial' key={index}>
                        {/*Ivan: Este é o Header do Card para salas Physicas*/}
                        <Cards.HeaderPhysical room_name={sala.physical_room_name} />
                        {<Cards.BodySalaAdm nivelDePermissao={sala.physical_room_permission_level} capacidade={sala.physical_room_vacancies} />}
                    </Cards.Root>
                );
            }
        });
    }


    return (

        <Box>
            <Flex
                w='100%'
                wrap='wrap'
                gap='3rem'>

                {renderSalas(salasPresenciais)}

            </Flex>

        </Box>

    )
}