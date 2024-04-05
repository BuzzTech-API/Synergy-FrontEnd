'use client'
import { Center, Flex, Heading, Select, } from "@chakra-ui/react";
import { Navbar } from "../components/Navbar/Navbar";
import { ChangeEvent, useState } from "react";
import { FormControlInput } from "../components/FormControlInput/FormControlInput";


export default function CadastrarUsuario() {
  const [input, setInput] = useState('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)


  return (
    <main>
      <Flex>
        <Navbar.Root>
          <Navbar.Menu user={'administrador'} />
          <Navbar.Perfil user={'Carlos'} />
        </Navbar.Root>
      </Flex>
      <Center mt={'7rem'}>
        <Center flexDir={'column'} p={"2rem"} gap={'1.5rem'} width={'37.5rem'} bg={"#FFF"} borderRadius={'0.625rem'}>
          <Heading color={"#007ABE"} variant={'big'} fontWeight={'normal'}>Cadastrar Usuário</Heading>
          <FormControlInput input={input} handleInputChange={handleInputChange} campo="Nome Completo" type="email" />
          <FormControlInput input={input} handleInputChange={handleInputChange} campo="Email" type="" />
          <FormControlInput input={input} handleInputChange={handleInputChange} campo="Senha" type="password" />
          <FormControlInput input={input} handleInputChange={handleInputChange} campo="Área" type="" />
          <Flex w='100%' gap="1rem"><Heading fontWeight={'normal'} whiteSpace={'nowrap'}>Nível de Permissão</Heading> <Select placeholder='Escolha o Nível de Permissão'>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </Select>

          </Flex>
        </Center>
      </Center>
    </main>
  )
}
