'use client'

import { Center,Text, Flex, Heading, Select, useToast } from "@chakra-ui/react"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { cadastrarSala } from "./services/cadastrarSalaFisica"
import { FormControlInput } from "../components/FormControlInput/FormControlInput"
import { BtnCriarSala } from "../components/buttons/IconBtns/BtnCriarSala&Usuario"

export default function CadastrarSalaPresencial() {

    // Objeto para criar o usuário
    const [room, setRoom] = useState({
      name: '',
      capacity: '',
      permissionLevel: 0
    })
    const toast = useToast()
  

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setIsError: Dispatch<SetStateAction<boolean>>) => {
        // função para lidar com as alterações do formulário e quando o usuário fizer algo errado mostrar erro no campo
        if (e.target.value !== '') {
          setIsError(false)
        }
        else {
          setIsError(true)
        }
        if (e.target.id === 'name') {
          setRoom({ ...room, name: e.target.value })
        } else if (e.target.id === 'capacity') {
          setRoom({ ...room, capacity: e.target.value })
        } 
    }
  

    const submit = (e: any) => {
      // função que envia os dados do formulário para o backend
      e.preventDefault()
  
      const body = {
        "room_name": room.name,
        "romm_capacity": room.capacity,
        "romm_permission_level": room.permissionLevel,
      }

      const request = cadastrarSala(body)
  
      // Notificação de Sucesso
      toast.promise(request, {
        success: { title: 'Sala presencial criada', description: 'com sucesso.' },
        error: { title: 'Erro', description: 'Erro ao criar o sala presencial.' },
        loading: { title: 'Criando sala', description: 'Por favor, espere um momento.' },
      })
      setRoom({
        name: '',
        capacity: '',
        permissionLevel: 0
      })
  
    }
  
  
  
    return (
      <main>
        <form method="POST" onSubmit={submit}>
          <Center mt={'7rem'}>
            {/* formulário de cadastro*/}
            <Center flexDir={'column'} p={"2rem"} gap={'1.0rem'} width={'37.5rem'} bg={"#FFF"} borderRadius={'0.625rem'} marginTop={'3rem'}>
              <Heading color={"#007ABE"} variant={'big'} fontWeight={'normal'}>Cadastro de Sala Presencial</Heading>
              <FormControlInput id='name' input={room.name} handleInputChange={handleInputChange} campo="Nome" type="" />
              <FormControlInput id='capacity' input={room.capacity} handleInputChange={handleInputChange} campo="Capacidade" type="" />
              <Flex w='100%' gap="1rem"><Heading fontWeight={'normal'} whiteSpace={'nowrap'}>Nível de Permissão</Heading>
                <Select placeholder='Escolha o Nível de Permissão' value={room.permissionLevel} onChange={(e: ChangeEvent<HTMLSelectElement>) => setRoom({
                  ...room, permissionLevel: Number.parseInt(e.target.value)
                })}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </Select>
              </Flex>
              <Text color={'black'} textAlign={'center'}>By proceeding you agree with our <span>Terms of Service</span> & <span>Privacy Policy</span></Text>
              <BtnCriarSala type={'submit'} />
            </Center>
          </Center>
        </form>
      </main>
    )
}