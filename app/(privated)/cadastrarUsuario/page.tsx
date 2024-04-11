'use client'
import { Center, Flex, Heading, Select, Text, useToast } from "@chakra-ui/react";
import { Navbar } from "../../components/Navbar/Navbar";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { FormControlInput } from "../../components/FormControlInput/FormControlInput";
import { BtnCriarUsuario } from "../../components/buttons/IconBtns/BtnCriarSala&Usuario";
import { cadastrarUsuario } from "./services/cadastrarUsuario";


export default function CadastrarUsuario() {
  // useState para controlar a validade dos campos
  const [nameValid, setNameValid] = useState(false)
  const [emailValid, setEmailValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [boardValid, setBoardValid] = useState(false)

  // Objeto para criar o usuário
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    board: '',
    permissionLevel: 0
  })
  const toast = useToast()

  // verifica se todos os campos estão preenchido
  const isFormValid = nameValid && emailValid && passwordValid && boardValid && (user.permissionLevel !== 0)


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setIsError: Dispatch<SetStateAction<boolean>>) => {
    const { id, value } = e.target
    let isValid = true

    if (id === 'name') {
      // Verifica se o valor não começa com espaço e não excede 150 caracteres
      isValid = value.trim() !== '' && value.length <= 150 && !value.startsWith(' ')
      setIsError(false)
    } else if (id === 'board') {
      // Verifica se o valor não começa com espaço e não excede 80 caracteres
      isValid = value.trim() !== '' && value.length <= 80 && !value.startsWith(' ')
      setIsError(false)
    } else {
      // Validação genérica para outros campos (não vazios)
      isValid = value.trim() !== ''
    }

    // função para lidar com as alterações do formulário e quando o usuário fizer algo errado mostrar erro no campo
    setIsError(!isValid)

    setUser(prevState => ({
      ...prevState,
      [id]: value
    }))

    // Atualiza o estado de validade do campo
    if (id === 'name') {
      setNameValid(isValid)
    } else if (id === 'email') {
      setEmailValid(isValid)
    } else if (id === 'password') {
      setPasswordValid(isValid)
    } else if (id === 'board') {
      setBoardValid(isValid)
    }
  }


  const submit = async (e: any) => {
    // função que envia os dados do formulário para o backend
    e.preventDefault()

    const body = {
      "user_name": user.name,
      "user_email": user.email,
      "user_password": user.password,
      "user_permission_level": user.permissionLevel,
      "user_board": user.board
    }
    const request = cadastrarUsuario(body)

    // Notificação de Sucesso
    toast.promise(request, {
      success: {
        title: 'Usuário Criado',
        description: 'com sucesso.',
        position: 'top',
        isClosable: true,
      },

      error: {
        title: 'Erro',
        description: 'Erro ao criar o Usuário.',
        position: 'top',
        isClosable: true,
      },

      loading: {
        title: 'Criando Usuário',
        description: 'Por favor, espere um momento.',
        position: 'top',
        isClosable: true,
      },
    })

    setUser({
      name: '',
      email: '',
      password: '',
      board: '',
      permissionLevel: 0
    })
    setNameValid(false)
    setBoardValid(false)
    setEmailValid(false)
    setPasswordValid(false)
  }


  return (

    <main>
      <Flex>
        <Navbar.Root>
          <Navbar.Menu />
          <Navbar.Perfil />
        </Navbar.Root>
      </Flex>
      <form method="POST" onSubmit={submit}>
        <Center mt={'7rem'}>
          {/* formulário de cadastro*/}
          <Center flexDir={'column'} p={"2rem"} gap={'1.0rem'} width={'37.5rem'} bg={"#FFF"} borderRadius={'0.625rem'}>
            <Heading color={"#007ABE"} variant={'big'} fontWeight={'normal'}>Cadastrar Usuário</Heading>
            <FormControlInput id='name' input={user.name} handleInputChange={handleInputChange} campo="Nome Completo" type="" />
            <FormControlInput id='email' input={user.email} handleInputChange={handleInputChange} campo="Email" type="email" />
            <FormControlInput id='password' input={user.password} handleInputChange={handleInputChange} campo="Senha" type="password" />
            <FormControlInput id='board' input={user.board} handleInputChange={handleInputChange} campo="Área" type="" />
            <Flex w='100%' gap="1rem"><Heading fontWeight={'normal'} whiteSpace={'nowrap'}>Nível de Permissão</Heading>
              <Select placeholder='Escolha o Nível de Permissão' value={user.permissionLevel} onChange={(e: ChangeEvent<HTMLSelectElement>) => setUser({
                ...user, permissionLevel: Number.parseInt(e.target.value)
              })}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </Select>
            </Flex>
            <Text color={'black'} textAlign={'center'}>By proceeding you agree with our <span>Terms of Service</span> & <span>Privacy Policy</span></Text>
            <BtnCriarUsuario type={'submit'} isDisabled={!isFormValid} />
          </Center>
        </Center>
      </form>
    </main>
  )
}
