'use client'

import { Center, Flex, Select, useToast, Text, Heading, useDisclosure, Modal, ModalContent, ModalFooter, ModalBody, FormControl, FormLabel, ModalCloseButton, ModalHeader, ModalOverlay, Button, Input } from "@chakra-ui/react"
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react"
import { editarSalaPresencial } from "../../service/editarSalaPresencial"
import { FormControlInput } from "@/app/components/FormControlInput/FormControlInput"
import { BtnEditar, BtnSalvar } from "@/app/components/buttons/IconBtns/BtnEditar&Salvar"
import React from "react"
import { BtnCancelar } from "@/app/components/buttons/IconBtns/BtnDesmarcar&Cancelar"
import { PhysicalRooms } from "@/app/type/rooms"

type props = {
  sala: PhysicalRooms;
  setSalasPresenciais: Dispatch<SetStateAction<PhysicalRooms[]>>;
  salas: PhysicalRooms[]

}

export default function EditarSalaPresencial({ sala, setSalasPresenciais, salas }: props) {
  const [nameValid, setNameValid] = useState(false);
  const [capacityValid, setCapacityValid] = useState(false);
  const [localityValid, setLocalityValid] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);


  // Objeto para editar sala
  const [room, setRoom] = useState({
    name: sala.physical_room_name,
    capacity: ('' + sala.physical_room_vacancies),
    permissionLevel: sala.physical_room_permission_level,
    locality: sala.physical_room_address
  });

  const toast = useToast();



  const isPermissionLevelValid = [1, 2, 3].includes(room.permissionLevel);
  const isFormValid = capacityValid && nameValid && localityValid && isPermissionLevelValid;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setIsError: Dispatch<SetStateAction<boolean>>) => {
    const { id, value } = e.target;
    let isValid = true;

    // Função para lidar com as alterações do formulário e validar campos
    if (id === 'name') {
      isValid = value.trim() !== '' && value.length <= 80 && !value.startsWith(' ');
      setIsError(!isValid);
    } else if (id === 'capacity') {
      isValid = value.trim() !== '' && !value.startsWith(' ');
      setIsError(!isValid);
    } else if (id === 'locality') {
      isValid = value.trim() !== '' && !value.startsWith(' ');
      setIsError(!isValid);
    }

    setRoom(prevState => ({
      ...prevState,
      [id]: value
    }));

    // Atualiza o estado de validade do campo
    if (id === 'name') {
      setNameValid(isValid);
    } else if (id === 'capacity') {
      setCapacityValid(isValid);
    } else if (id === 'locality') {
      setLocalityValid(isValid);
    }
  }

  const submit = async (e: any) => {
    // Função que envia os dados do formulário para o backend
    e.preventDefault();

    if (room.name === '' && room.name.length >= 80) {
      toast({
        title: "Erro",
        description: "O nome da sala não pode estar vazio",
        status: "error",
        position: 'top',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    else if (room.capacity === '') {
      toast({
        title: "Erro",
        description: "A capacidade da sala não pode estar vazia",
        status: "error",
        position: 'top',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    else if (room.locality === '') {
      toast({
        title: "Erro",
        description: "O local da sala não pode estar vazio",
        status: "error",
        position: 'top',
        duration: 3000,
        isClosable: true,
      })
      return
    }


    const body = {
      physical_room_id: sala.physical_room_id,
      physical_room_name: room.name,
      physical_room_vacancies: Number.parseInt(room.capacity),
      physical_room_permission_level: room.permissionLevel,
      physical_room_address: room.locality
    };


    try {
      const request = editarSalaPresencial(body);
      toast.promise(request, {
        success: {
          title: 'Edição de sala concluída',
          description: 'com sucesso.',
          position: 'top',
          isClosable: true,
        },
        error: {
          title: 'Erro',
          description: 'Erro ao editar sala',
          position: 'top',
          isClosable: true,
        },
        loading: {
          title: 'Editando informações da sala',
          description: 'Por favor, espere um momento',
          position: 'top',
          isClosable: true,
        },
      });

      await request;

      setSalasPresenciais(salas.map((salaAtual, index) => {
        if (salaAtual.physical_room_id === sala.physical_room_id) {
          salaAtual.physical_room_name = room.name
          salaAtual.physical_room_vacancies = Number.parseInt(room.capacity)
          salaAtual.physical_room_permission_level = room.permissionLevel
          salaAtual.physical_room_address = room.locality
          return salaAtual
        } else {
          return salaAtual
        }
      }))
      onClose()
    } catch (error) {
      console.error('Erro ao editar sala:', error);
    }
  }
  return (
      <form method="PUT" onSubmit={submit}>
        <BtnEditar onClick={onOpen} />

        <Modal
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edição de sala</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControlInput id='name' input={room.name} handleInputChange={handleInputChange} campo="Nome" type="" />
              <FormControlInput id='capacity' input={room.capacity} handleInputChange={handleInputChange} campo="Capacidade" type="number" />
              <FormControlInput id='locality' input={room.locality} handleInputChange={handleInputChange} campo="Endereço / Local" type="" />
              <Flex w='100%' gap="1rem" marginTop={4}><Heading fontWeight={'normal'} whiteSpace={'nowrap'}>Nível de Permissão</Heading>
                <Select placeholder='Escolha o Nível de Permissão' value={room.permissionLevel} onChange={(e: ChangeEvent<HTMLSelectElement>) => setRoom({
                  ...room, permissionLevel: Number.parseInt(e.target.value)
                })}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </Select>
              </Flex>
            </ModalBody>
            <ModalFooter gap={3}>
              <BtnSalvar onClick={submit} />
              <BtnCancelar onClick={onClose} />
            </ModalFooter>
          </ModalContent>
        </Modal>
      </form>
  )
}