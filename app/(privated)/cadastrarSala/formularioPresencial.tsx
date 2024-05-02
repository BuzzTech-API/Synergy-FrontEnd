'use client'

import { Center, Text, Flex, Heading, Select, useToast } from "@chakra-ui/react"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { cadastrarSala } from "./services/cadastrarSalaFisica"
import { FormControlInput } from "@/app/components/FormControlInput/FormControlInput"
import { BtnCriarSala } from "@/app/components/buttons/IconBtns/BtnCriarSala&Usuario"

export default function CadastrarSalaPresencial() {
  const [nameValid, setNameValid] = useState(false)
  const [capacityValid, setCapacityValid] = useState(false)
  // Objeto para criar a sala
  const [room, setRoom] = useState({
    name: '',
    capacity: '',
    permissionLevel: 0
  })
  const toast = useToast()
  const isFormValid = capacityValid && nameValid && (room.permissionLevel !== 0)

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
    }
  }


  const submit = (e: any) => {
    // função que envia os dados do formulário para o backend
    e.preventDefault()

    const body = {
      "physical_room_name": room.name,
      "physical_room_vacancies": Number.parseInt(room.capacity),
      "physical_room_permission_level": room.permissionLevel,
    }
    
    const request = cadastrarSala(body)

    // Notificação de Sucesso
    toast.promise(request, {
      success: {
        title: 'Sala presencial criada',
        description: 'com sucesso.',
        position: 'top',
        isClosable: true,
      },

      error: {
        title: 'Erro',
        description: 'Erro ao criar a sala presencial',
        position: 'top',
        isClosable: true,
      },

      loading: {
        title: 'Criando sala',
        description: 'Por favor, espere um momento',
        position: 'top',
        isClosable: true,
      },
    })

    setRoom({
      name: '',
      capacity: '',
      permissionLevel: 0
    })
    setCapacityValid(false)
    setNameValid(false)
  }



  return (
    <main>
      <form method="POST" onSubmit={submit}>
        <Center mt={'7rem'}>
          {/* formulário de cadastro*/}
          <Center flexDir={'column'} p={"2rem"} gap={'1.0rem'} width={'37.5rem'} bg={"#FFF"} borderRadius={'0.625rem'} marginTop={'3rem'}>
            <Heading color={"#007ABE"} variant={'big'} fontWeight={'normal'}>Cadastro de Sala Presencial</Heading>
            <FormControlInput id='name' input={room.name} handleInputChange={handleInputChange} campo="Nome" type="" />
            <FormControlInput id='capacity' input={room.capacity} handleInputChange={handleInputChange} campo="Capacidade" type="number" />
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
            <BtnCriarSala type={'submit'} isDisabled={!isFormValid} />
          </Center>
        </Center>
      </form>
    </main>
  )
}