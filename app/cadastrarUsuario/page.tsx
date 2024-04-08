'use client'
import { Center, Flex, Heading, Select, Text, useToast } from "@chakra-ui/react";
import { Navbar } from "../components/Navbar/Navbar";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { FormControlInput } from "../components/FormControlInput/FormControlInput";
import { BtnCriarUsuario } from "../components/buttons/IconBtns/BtnCriarSala&Usuario";
import { cadastrarUsuario } from "./services/cadastrarUsuario";


export default function CadastrarUsuario() {

  // Objeto para criar o usuário
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    board: '',
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
      setUser({ ...user, name: e.target.value })
    } else if (e.target.id === 'email') {
      setUser({ ...user, email: e.target.value })
    } else if (e.target.id === 'password') {
      setUser({ ...user, password: e.target.value })
    } else if (e.target.id === 'board') {
      setUser({ ...user, board: e.target.value })
    }
  }


  const submit = (e: any) => {
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
      success: { title: 'Usuário Criado', description: 'com sucesso.' },
      error: { title: 'Erro', description: 'Erro ao criar o Usuário.' },
      loading: { title: 'Criando Usuário', description: 'Por favor, espere um momento.' },
    })
    setUser({
      name: '',
      email: '',
      password: '',
      board: '',
      permissionLevel: 0
    })

  }



  return (
    <main>
      <Flex>
        <Navbar.Root>
          <Navbar.Menu user={'administrador'} />
          <Navbar.Perfil user={'Carlos'} />
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
            <BtnCriarUsuario type={'submit'} />
          </Center>
        </Center>
      </form>
    </main>
  )
}
