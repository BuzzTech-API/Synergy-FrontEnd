
import { Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type props = {
	handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
	input: string,
	campo: string,
	type: string
}

export function FormControlInput({ handleInputChange, input, campo, type }: props) {



	const isError = input === ''

	return (

		<FormControl isInvalid={isError}>
			<FormLabel><Heading fontWeight={'normal'}>{campo}</Heading></FormLabel>
			<Flex pl={'1rem'}><Input variant={isError ? 'error' : 'default'} type={type} value={input} onChange={handleInputChange} /></Flex>
			{!isError ? (<></>
			) : (
				<FormErrorMessage>Este campo é obrigatório.</FormErrorMessage>
			)}
		</FormControl>
	)
}

