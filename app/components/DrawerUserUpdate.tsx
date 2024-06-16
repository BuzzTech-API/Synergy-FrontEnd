"use client"
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Heading, Input, Text, useDisclosure } from "@chakra-ui/react"
import NavbarOptionsMenu from "./Navbar/NavbarOptionsMenu"
import React from "react"
import { useSession } from "next-auth/react"
import { BtnEditar } from "./buttons/IconBtns/BtnEditar&Salvar"
import { FormControlInput } from "./FormControlInput/FormControlInput"
import { BtnCancelar } from "./buttons/IconBtns/BtnDesmarcar&Cancelar"
import { updateUser } from "../(privated)/cadastrarUsuario/services/updateUser"

export function DrawerUserUpdate() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { data: session } = useSession();
	const [nome, setNome] = React.useState(session?.user.user_name !== undefined ? session.user.user_name : "")
	const [email, setEmail] = React.useState(session?.user.user_email !== undefined ? session.user.user_email : "")
	const [senha, setSenha] = React.useState("")
	const [nameValid, setNameValid] = React.useState(false)
	const [emailValid, setEmailValid] = React.useState(false)
	const [passwordValid, setPasswordValid] = React.useState(false)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setIsError: React.Dispatch<React.SetStateAction<boolean>>) => {
		const { id, value } = e.target
		let isValid = true

		if (id === 'name') {
			// Verifica se o valor não começa com espaço e não excede 150 caracteres
			isValid = value.trim() !== '' && value.length <= 150 && !value.startsWith(' ')
			setIsError(!isValid)
		} else if (id === 'email') {
			// Verifica se o valor não começa com espaço e não excede 80 caracteres
			const emailRegex = /^[\w-\.]+@[\w-]+\.[\w-\.]{2,}$/
			isValid = emailRegex.test(value.trim())
			setIsError(!isValid)
		} else {
			// Validação genérica para outros campos (não vazios)
			isValid = value.trim() !== ''
			setIsError(!isValid)
		}
		// Atualiza o estado de validade do campo
		if (id === 'name') {
			setNome(value)
			setNameValid(isValid)
		} else if (id === 'email') {
			setEmail(value)
			setEmailValid(isValid)
		} else if (id === 'password') {
			setSenha(value)
			setPasswordValid(isValid)
		}
	}

	async function handleSubmit(e:any) {
		e.preventDefault();
		const body = {
			"user_id": session?.user.user_id,
			"user_name": nome,
			"user_email": email,
			"user_password": senha,
		}

		try {
			const updatedUser = await updateUser(body)
			if (session) {
				session.user.user_name = updatedUser.user_name
				session.user.user_email = updatedUser.user_email 
			}
		} catch (error) {
			
		} finally{
			onClose()
		}
		
	}

	return (
		<>
			<NavbarOptionsMenu hasCorFundo={false} onClick={onOpen} texto='Editar Perfil' />
			<Drawer
				isOpen={isOpen}
				placement='right'
				size={"md"}
				onClose={onClose}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<Heading as={DrawerHeader} color={"#007ABE"} variant={'big'} fontWeight={'normal'}>Editar Perfil</Heading>

					<DrawerBody >
						<form onSubmit={handleSubmit} id="da">
							<Flex gap={"2rem"} flexDir={"column"}>
								<FormControlInput id='name' input={nome} handleInputChange={handleInputChange} campo="Nome Completo" type="" />
								<FormControlInput id='email' input={email} handleInputChange={handleInputChange} campo="Email" type="email" />
								<FormControlInput id='password' input={senha} handleInputChange={handleInputChange} campo="Senha" type="password" />
							</Flex>
						</form>
					</DrawerBody>

					<DrawerFooter gap={"2rem"}>
						<BtnCancelar onClick={onClose} />
						<BtnEditar type="submit" form="da" />
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	)
}
