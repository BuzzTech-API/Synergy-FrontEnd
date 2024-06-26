'use client'
import { BtnEntrar } from "@/app/components/buttons/IconBtns/BtnRemover&Entrar";
import { Center, Flex, FormControl, FormLabel, Heading, Input, useToast } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import logar from "../services/login";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function FormularioLogin() {

	const [input, setInput] = useState({
		email: "",
		senha: ""
	})
	const toast = useToast()

	const router = useRouter();

	async function onSubmit(e: any) {
		e.preventDefault()
		const loadingToast = toast({
			title: "Fazendo login",
			description: "Fazendo login no sistema, aguarde...",
			status: "info",
			position: 'top',
			duration: null, // Define a duração como null para manter o toast visível enquanto estiver carregando
			isClosable: false, // Impede que o usuário feche o toast enquanto estiver carregando
		})
		if (input.email === '') {
			toast.close(loadingToast)
			toast({
				title: "Erro",
				description: "Informe o email do usuário.",
				status: "error",
				position: 'top',
				duration: 3000,
				isClosable: true,
			})
			return
		} else if (input.senha === '') {
			toast.close(loadingToast)
			toast({
				title: "Erro",
				description: "Informe a senha do usuário.",
				status: "error",
				position: 'top',
				duration: 3000,
				isClosable: true,
			})
			return
		}

		try {
			const resposta = await signIn('credentials', {
				email: input.email,
				password: input.senha,
				redirect: false,
			})
			if (resposta?.error) {
				throw new Error(resposta.error)
			}
			toast.close(loadingToast)
			router.replace('/')

		} catch (error) {
			toast.close(loadingToast)
			toast({
				title: "Erro",
				description: "Credenciais inválidas",
				status: "error",
				position: 'top',
				duration: 3000,
				isClosable: true,
			})
		}
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
							type={'password'}
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
