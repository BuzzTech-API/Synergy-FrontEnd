import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { SetStateAction, useEffect, useState } from "react"
import { User } from "@/app/type/user"
import { Search2Icon } from '@chakra-ui/icons'


type SearchBarProps = {
    setSearchResults: React.Dispatch<SetStateAction<User[]>>
}

export const SearchBar = ({ setSearchResults }: SearchBarProps) => {
    useEffect(() => {
        const fetchUsers = async () => { // useEffect para buscar usuários ao carregar o componente
            try {
                const response = await fetch('http://localhost:5000/users/', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                if (!response.ok) {
                    throw new Error("Erro na requisição")
                }
                const json = await response.json()
                setUsers(json) // Atualiza o estado 'users' com os usuários recebidos da API
            } catch (error) {
                alert("Erro ao carregar usuários\nComponente:\n- SearchBarUsers/SearchBar diz: coloca o refresh token na rota aqui isaque")
            }
        }
        fetchUsers()
    }, [])

    const [users, setUsers] = useState<User[]>([]) // Estado para armazenar a lista de usuários
    const [input, setInput] = useState("") // Estado para armazenar o valor do input de pesquisa

    const filterUsers = (value: SetStateAction<string>) => { // Função para filtrar os usuários com base no valor do input
        const results = users.filter((user: User) =>
            value &&
            user &&
            user.user_name &&
            user.user_name.toLowerCase().includes(value.toString().toLowerCase()))
        setSearchResults(results) // Atualiza os resultados da busca com os usuários filtrados
    }

    const handleChange = (value: SetStateAction<string>) => {
        setInput(value)
        filterUsers(value)
    }

    return (
        <Box>
            <InputGroup variant={'search'}>
                <Input placeholder="Digite para buscar..." value={input} onChange={(e) => handleChange(e.target.value)} />
                <InputRightElement>
                    <Search2Icon />
                </InputRightElement>
            </InputGroup>
        </Box>

    )
}