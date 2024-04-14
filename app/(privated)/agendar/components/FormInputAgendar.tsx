
import { Center, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Textarea } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

type props = {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>, setIsError: Dispatch<SetStateAction<boolean>>) => void,
  input: string,
  id: string,
  campo: string,
  type: string,
  width?: string,
}

export function FormInputAgendar({ handleInputChange, input, campo, id, type, width = '100%' }: props) {
  // Input com indentifcação visual de erro, caso queria utilizar
  // use de exemplo a tela de cadastro de usuário para reproduzir
  const [isError, setIsError] = useState(false)


  return (
    <FormControl isInvalid={isError}>
      <Center flexDir={'column'}>
        <FormLabel><Heading >{campo}</Heading></FormLabel>
        {type === 'textarea' ? <>
          <Input
            as={Textarea}
            id={id}
            width={width}
            minHeight={'15rem'}
            variant={isError ? 'error' : 'default'}
            type={type}
            value={input}
            onChange={
              (e: ChangeEvent<HTMLInputElement>) => handleInputChange(e, setIsError)
            } />

          {!isError ? (<></>
          ) : (
            <FormErrorMessage>Este campo é obrigatório.</FormErrorMessage>
          )}
        </> : <>
          <Input
            id={id}
            width={width}
            variant={isError ? 'error' : 'default'}
            type={type}
            value={input}
            onChange={
              (e: ChangeEvent<HTMLInputElement>) => handleInputChange(e, setIsError)
            } />

          {!isError ? (<></>
          ) : (
            <FormErrorMessage>Este campo é obrigatório.</FormErrorMessage>
          )}</>
        }
      </Center>
    </FormControl>
  )
}
