
import { Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

type props = {
	handleInputChange: (e: ChangeEvent<HTMLInputElement>, setIsError: Dispatch<SetStateAction<boolean>>) => void,
	input: string,
	id: string
	campo: string,
	type: string
}

export function FormControlInput({ handleInputChange, input, campo, id, type }: props) {
	// Input com indentifcação visual de erro, caso queria utilizar
	// use de exemplo a tela de cadastro de usuário para reproduzir
	const [isError, setIsError] = useState(input === '')


	return (

		<FormControl isInvalid={isError}>
			<FormLabel><Heading fontWeight={'normal'}>{campo}</Heading></FormLabel>
			<Flex pl={'1rem'}>
				<Input
					id={id}
					variant={isError ? 'error' : 'default'}
					type={type}
					value={input}
					onChange={
						(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e, setIsError)
					} />

			</Flex>
			{!isError ? (<></>
			) : (
				<FormErrorMessage>Este campo é obrigatório.</FormErrorMessage>
			)}
		</FormControl>
	)
}

