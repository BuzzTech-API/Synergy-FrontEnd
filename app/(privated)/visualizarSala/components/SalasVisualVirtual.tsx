'use client'

import { Box, Button, Flex} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GetSalasVirtuaisService } from "../../agendar/components/Salas/services/SalasService";
import { Cards } from "@/app/components/cards";
import { VirtualRoom } from "@/app/type/rooms";
import { excluirSalaVirtual } from "../service/excluirSala";
import { BtnRemover } from "@/app/components/buttons/IconBtns/BtnRemover&Entrar";
import { BtnEditar } from "@/app/components/buttons/IconBtns/BtnEditar&Salvar";

export default function SalasVisualVirtual() {
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

    const handleClick = (sala: VirtualRoom) => {
        excluirSalaVirtual(sala.virtual_room_id)
        console.log("Este é o id da sala: " + sala.virtual_room_id)
        setSalasVirtuais(SalasVirtuais.map((salas, index)=>{
            if(salas.virtual_room_id === sala.virtual_room_id ){
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
            {SalasVirtuais.map((sala, index) => {
                    return (<>{ sala.is_active &&
                        <Cards.Root variant='virtual' key={index}>
                        {/*Ivan: Este é o Header do Card para salas Virtuais*/}
                            <Cards.HeaderVirtual room_name={sala.virtual_room_name} />
                            <Cards.BodySalaAdm nivelDePermissao={sala.virtual_room_permission_level} capacidade={0}>
                                <BtnRemover onClick={() => (handleClick(sala))} zIndex={2}>Excluir</BtnRemover>
                                <BtnEditar zIndex={2}>Editar</BtnEditar>
                            </Cards.BodySalaAdm>
                        </Cards.Root>
                        }</>
                    )
                })}
            </Flex>
        </Box>
    )
}
