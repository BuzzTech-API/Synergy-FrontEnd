'use client'

import { Center, Text, Heading, Select, useToast, Flex } from "@chakra-ui/react"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { cadastrarSalaVirtual } from "./services/cadastrarSalaVirtual"
import { FormControlInput } from "@/app/components/FormControlInput/FormControlInput"
import { BtnCriarSala } from "@/app/components/buttons/IconBtns/BtnCriarSala&Usuario"
import EditarSalaVirtual from "../editarSala/formEditVirtual"

export default function CadastrarSalaVirtual() {
  const [nameValid, setNameValid] = useState(false)
  const [loginValid, setLoginValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [linkValid, setLinkValid] = useState(false)

  // Objeto para criar sala
  const [room, setRoom] = useState({
    name: '',
    login: '',
    password: '',
    link: '',
    permissionLevel: 0
  })

  const toast = useToast()
  const isPermissionLevelValid = [1, 2, 3].includes(room.permissionLevel);
  const isFormValid = nameValid && loginValid && passwordValid && isPermissionLevelValid;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setIsError: Dispatch<SetStateAction<boolean>>) => {
    const { id, value } = e.target
    let isValid = true
    // função para lidar com as alterações do formulário e quando o usuário fizer algo errado mostrar erro no campo
    if (id === 'name') {
      isValid = value.trim() !== '' && value.length <= 80 && !value.startsWith(' ')
      setIsError(!isValid)
    } else if (id === 'login') {
      isValid = value.trim() !== '' && !value.startsWith(' ')
      setIsError(!isValid)
    } else if (id === 'password') {
      isValid = value.trim() !== '' && !value.startsWith(' ') && value.length <= 20
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
    } else if (id === 'login') {
      setLoginValid(isValid)
    } else if (id === 'password') {
      setPasswordValid(isValid)
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

    const request = cadastrarSalaVirtual(body)

    //// Notificação de Sucesso
    toast.promise(request, {
      success: {
        title: 'Sala virtual criada',
        description: 'com sucesso.',
        position: 'top',
        isClosable: true,
      },

      error: {
        title: 'Erro',
        description: 'Erro ao criar a sala virtual',
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
      login: '',
      password: '',
      link: '',
      permissionLevel: 0
    })
    setLoginValid(false)
    setPasswordValid(false)
    setNameValid(false)
    setLinkValid(false)
  }

  return (
    <main>
      <form method="POST" onSubmit={submit}>
        <Center mt={'7rem'}>
          {/* formulário de cadastro*/}
          <Center flexDir={'column'} p={"2rem"} gap={'1.0rem'} width={'37.5rem'} bg={"#FFF"} borderRadius={'0.625rem'} marginTop={'3rem'}>
            <Heading color={"#007ABE"} variant={'big'} fontWeight={'normal'}>Cadastro de Sala Virtual</Heading>
            <FormControlInput id='name' input={room.name} handleInputChange={handleInputChange} campo="Nome" type="" />
            <FormControlInput id='login' input={room.login} handleInputChange={handleInputChange} campo="Login" type="" />
            <FormControlInput id='password' input={room.password} handleInputChange={handleInputChange} campo="Senha" type="password" />
            <FormControlInput id='link' input={room.link} handleInputChange={handleInputChange} campo="Link" type="" />
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
            <BtnCriarSala type={'submit'} isDisabled={!isFormValid}/>
          </Center>
        </Center>
      </form>
    </main>
  )
}
