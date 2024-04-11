import { FormControlInput } from "@/app/components/FormControlInput/FormControlInput";
import { Center, Flex, Heading, useToast } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { FormInputAgendar } from "./FormInputAgendar";

export default function FormularioPresencial() {

  // useState para controlar a validade dos campos
  const [nameValid, setNameValid] = useState(false)
  const [emailValid, setEmailValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [boardValid, setBoardValid] = useState(false)

  // Objeto para criar o usuário
  const [agendamento, setAgendamento] = useState({
    meeting_title: '',
    meeting_subject: '',
  })
  const toast = useToast()

  // verifica se todos os campos estão preenchido
  const isFormValid = nameValid && emailValid && passwordValid && boardValid


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

    setAgendamento(prevState => ({
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



  return (
    <form>
      <Center flexDir={'column'}>
        <FormInputAgendar handleInputChange={handleInputChange} input={agendamento.meeting_title} campo="Título da Reunião" id="meeting_title" type="time" />
      </Center>
    </form>
  )
}
