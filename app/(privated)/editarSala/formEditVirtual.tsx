'use client'

import { Center, Flex, Select, useToast, Text, Heading, useDisclosure, Modal, ModalContent, ModalFooter, ModalBody, FormControl, FormLabel, ModalCloseButton, ModalHeader, ModalOverlay, Button, Input } from "@chakra-ui/react"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { FormControlInput } from "@/app/components/FormControlInput/FormControlInput"
import { BtnEditar, BtnSalvar } from "@/app/components/buttons/IconBtns/BtnEditar&Salvar"
import React from "react"
import { BtnCancelar } from "@/app/components/buttons/IconBtns/BtnDesmarcar&Cancelar"
import { editarSalaVirtual } from "./services/editarSalaVirtual"

export default function EditarSalaVirtual(){
    const [nameValid, setNameValid] = useState(false)
    const [linkValid, setLinkValid] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)

      // Objeto para editar sala
  const [room, setRoom] = useState({
    name: '',
    link: '',
    permissionLevel: 0
  })

  const toast = useToast()
  const isPermissionLevelValid = [1, 2, 3].includes(room.permissionLevel);
  const isFormValid = nameValid  && linkValid && isPermissionLevelValid;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setIsError: Dispatch<SetStateAction<boolean>>) => {
    const { id, value } = e.target
    let isValid = true
    // função para lidar com as alterações do formulário e quando o usuário fizer algo errado mostrar erro no campo
    if (id === 'name') {
      isValid = value.trim() !== '' && value.length <= 80 && !value.startsWith(' ')
      setIsError(!isValid)
    } else if (id === 'link') {
      isValid = value.trim() !== '' && !value.startsWith(' ') && /^(ftp|http|https):\/\/[^ "]+$/.test(value)
      setIsError(!isValid)
    }
    setRoom(prevState => ({
      ...prevState,
      [id]: value
    }))

    // Atualiza o estado de validade do campo
    if (id === 'name') {
      setNameValid(isValid)
    } else if (id === 'link') {
      setLinkValid(isValid)
    } 
  }

  const submit = (e: any) => {
    // função que envia os dados do formulário para o backend
    e.preventDefault()
    
        const body = {
            "virtual_room_name": room.name,
            "virtual_room_link": room.link,
            "virtual_room_permission_level": room.permissionLevel
          }

    const request = editarSalaVirtual(body)

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
        link: '',
        permissionLevel: 0
      })
      setNameValid(false)
      setLinkValid(false)

      
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
          <FormControlInput id='link' input={room.link} handleInputChange={handleInputChange} campo="Link" type="" />
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