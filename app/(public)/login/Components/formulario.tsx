'use client'
import { BtnEntrar } from "@/app/components/buttons/IconBtns/BtnRemover&Entrar";
import { Center, Flex, FormControl, FormLabel, Heading, Input, useToast } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import logar from "../services/login";

export default function FormularioLogin() {

	const [input, setInput] = useState({
		email: "",
		senha: ""
	})
	const toast = useToast()


	const onSubmit = (e: any) => {
		e.preventDefault()
		const body = {
			user_email: input.email,
			user_password: input.senha
		}
		const resposta = logar(body)

		resposta.then(() => {
			toast({
				title: "Logando...",
				description: "Por favor, espere um momento.",
				status: "info",
				duration: 2000,
				position: 'top-right',
				isClosable: true,
			})
			}).catch(() => {
				toast({
					title: "Erro.",
					description: "Erro ao logar no sistema.",
					status: "error",
					duration: 2000,
					position: 'top-right',
					isClosable: true
				})
			})
	}
	return (
		<form onSubmit={onSubmit}>
			<Center
				flexDir={'column'}
				width={'37.5rem'}
				height={'29.375rem'}
				bgColor={'#fff'}
				gap={'2rem'}
				p={'3rem'}
				borderRadius={'0.2rem'}
				boxShadow={'0.15rem 0.15rem 0.15rem 0.25rem rgba(0,0,0,25%)'}
			>
				<Heading variant="big" color="#007ABE">Entrar</Heading>
				<FormControl>
					<FormLabel><Heading fontWeight={'normal'}>Email</Heading></FormLabel>
					<Flex pl={'1rem'}>
						<Input
							variant={'default'}
							type={'text'}
							value={input.email}
							onChange={
								(e: ChangeEvent<HTMLInputElement>) => {
									setInput({
										...input,
										email: e.target.value
									})
								}
							} />
					</Flex>
				</FormControl>

				<FormControl>
					<FormLabel><Heading fontWeight={'normal'}>Senha</Heading></FormLabel>
					<Flex pl={'1rem'}>
						<Input
							variant={'default'}
							type={'text'}
							value={input.senha}
							onChange={
								(e: ChangeEvent<HTMLInputElement>) => {
									setInput({
										...input,
										senha: e.target.value
									})
								}
							} />
					</Flex>
				</FormControl>
				<BtnEntrar type='submit' />
			</Center>
		</form>
	)

}
