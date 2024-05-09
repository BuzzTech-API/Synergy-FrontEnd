import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import React, { SetStateAction, useEffect, useState } from "react"
import { User } from "@/app/type/user"
import { Search2Icon } from '@chakra-ui/icons'
import { getAllUsers } from "@/app/(privated)/agendar/service/getUsers"
import { useSession } from "next-auth/react"


type SearchBarProps = {
    setSearchResults: React.Dispatch<SetStateAction<User[]>>
    input: string
    setInput: React.Dispatch<SetStateAction<string>>
    setSelectedUser: React.Dispatch<SetStateAction<User[]>>
    selectedUser: User[]
}

export const SearchBar = ({ setSearchResults, input, setInput, setSelectedUser, selectedUser }: SearchBarProps) => {

    const session = useSession()
    useEffect(() => {

        const getAllUsersEffect = async () => {
            const usersList: User[] = await getAllUsers();
            usersList.forEach((user) => {

                if (user.user_id === session.data?.user.user_id) {
                    setSelectedUser([...selectedUser, user]) // Adiciona o usuário clicado à lista de usuários selecionados
                }
            })


            setUsers(usersList)

        }
        getAllUsersEffect()
    }
        , [])

    const [users, setUsers] = useState<User[]>([]) // Estado para armazenar a lista de usuários

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
