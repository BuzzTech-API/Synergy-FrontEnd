'use client'

import { Box, Button, Flex} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GetSalasService } from "../../agendar/components/Salas/services/SalasService";
import { Cards } from "@/app/components/cards";
import { PhysicalRooms } from "@/app/type/rooms";
import { excluirSala } from "../service/excluirSala";
import { BtnRemover } from "@/app/components/buttons/IconBtns/BtnRemover&Entrar";
import { BtnEditar } from "@/app/components/buttons/IconBtns/BtnEditar&Salvar";
import EditarSalaPresencial from "../../editarSala/formEditPresencial";

export default function SalasVisual() {
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

    const handleClick = (sala: PhysicalRooms) => {
        excluirSala(sala.physical_room_id)
        console.log("Este é o id da sala: " + sala.physical_room_id)
        setSalasPresenciais(salasPresenciais.map((salas, index)=>{
            if(salas.physical_room_id === sala.physical_room_id ){
                salas.is_active = false
                return salas
            } else{
                return salas
            }
            }))
    }

    return (
        <Box>
            <Flex
                w='100%'
                wrap='wrap'
                gap='3rem'>
                {salasPresenciais.map((sala, index) => {
                    return (<>{ sala.is_active &&
                        <Cards.Root variant='presencial' key={index}>   
                            {/*Ivan: Este é o Header do Card para salas Physicas*/}
                            <Cards.HeaderPhysical room_name={sala.physical_room_name} />
                            <Cards.BodySalaAdm nivelDePermissao={sala.physical_room_permission_level} capacidade={sala.physical_room_vacancies}>
                                <BtnRemover onClick={() => handleClick(sala)} zIndex={2}>Excluir</BtnRemover>
                                <EditarSalaPresencial/>
                            </Cards.BodySalaAdm>
                        </Cards.Root>
                        }</>
                    )
                })}
            </Flex>
        </Box>
    )
}