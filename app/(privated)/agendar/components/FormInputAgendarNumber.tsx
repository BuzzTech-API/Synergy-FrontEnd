
import { Center, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, NumberInput, NumberInputField, Textarea } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

type props = {
  handleInputChange: (e: number, setIsError: Dispatch<SetStateAction<boolean>>) => void,
  input: number,
  id: string,
  campo: string,
  width?: string,
}

export function FormInputAgendarNumber({ handleInputChange, input, campo, id, width = '100%' }: props) {
  // Input com indentifcação visual de erro, caso queria utilizar
  // use de exemplo a tela de cadastro de usuário para reproduzir
  const [isError, setIsError] = useState(false)


  return (
    <FormControl isInvalid={isError}>
      <Center flexDir={'column'}>
        <FormLabel><Heading >{campo}</Heading></FormLabel>
        <>
          <NumberInput
            id={id}
            width={width}
            variant={isError ? 'error' : 'default'}
            value={input}
            min={0}
            onChange={
              (valueAsString, valueAsNumber) => handleInputChange(valueAsNumber, setIsError)
            } >
            <NumberInputField />
          </NumberInput>

          {!isError ? (<></>
          ) : (
            <FormErrorMessage>Este campo é obrigatório.</FormErrorMessage>
          )}</>
      </Center>
    </FormControl>
  )
}
