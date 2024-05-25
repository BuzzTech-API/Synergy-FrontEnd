'use client'

import { Center, Flex, Select, useToast, Text, Heading, useDisclosure, Modal, ModalContent, ModalFooter, ModalBody, FormControl, FormLabel, ModalCloseButton, ModalHeader, ModalOverlay, Button, Input } from "@chakra-ui/react"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { editarSalaPresencial } from "./services/editarSalaPresencial"
import { FormControlInput } from "@/app/components/FormControlInput/FormControlInput"
import { BtnEditar, BtnSalvar } from "@/app/components/buttons/IconBtns/BtnEditar&Salvar"
import React from "react"
import { BtnCancelar } from "@/app/components/buttons/IconBtns/BtnDesmarcar&Cancelar"

export default function EditarSalaPresencial(){
    const [nameValid, setNameValid] = useState(false)
    const [capacityValid, setCapacityValid] = useState(false)
    const [localityValid, setLocalityValid] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)

    //Objeto para editar sala
    const [room, setRoom] = useState({
        name: '',
        capacity: '',
        permissionLevel: 0,
        locality: ''
    })

    const toast = useToast()


    const isPermissionLevelValid = [1, 2, 3].includes(room.permissionLevel); //Ivan: Eu criei essa variavel para validar somente se 1, 2 ou 3 fossem selecionados.
    const isFormValid = capacityValid && nameValid && localityValid && isPermissionLevelValid
  
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setIsError: Dispatch<SetStateAction<boolean>>) => {
      const { id, value } = e.target
      let isValid = true
      // função para lidar com as alterações do formulário e quando o usuário fizer algo errado mostrar erro no campo
      if (id === 'name') {
        isValid = value.trim() !== '' && value.length <= 80 && !value.startsWith(' ')
        setIsError(!isValid)
      } else if (id === 'capacity') {
        isValid = value.trim() !== '' && !value.startsWith(' ')
        setIsError(!isValid)
      } else if (id === 'locality') {
        isValid = value.trim() !== '' && !value.startsWith(' ')
        setIsError(!isValid)
      }

  
      setRoom(prevState => ({
        ...prevState,
        [id]: value
      }))
  
  
      // Atualiza o estado de validade do campo
      if (id === 'name') {
        setNameValid(isValid)
      } else if (id === 'capacity') {
        setCapacityValid(isValid)
      } else if (id === 'locality') {
        setLocalityValid(isValid)
      }
    }

    const submit = (e: any) => {
        // função que envia os dados do formulário para o backend
        e.preventDefault()
    
        const body = {
          "physical_room_name": room.name,
          "physical_room_vacancies": Number.parseInt(room.capacity),
          "physical_room_permission_level": room.permissionLevel,
          "physical_room_address": room.locality
        }

    const request = editarSalaPresencial(body)

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
      })
  
      setRoom({
        name: '',
        capacity: '',
        permissionLevel: 0,
        locality:''
      })
      setCapacityValid(false)
      setNameValid(false)
      setLocalityValid(false)

      
    }
    return (
        <main>
          <form method="POST" onSubmit={submit}>
      <BtnEditar onClick={onOpen}/>

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
            <BtnSalvar type={'submit'} isDisabled={!isFormValid}/>
            <BtnCancelar onClick={onClose}/>
          </ModalFooter>
        </ModalContent>
      </Modal>
          </form>
        </main>
      )

}