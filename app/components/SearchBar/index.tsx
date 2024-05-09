
import { SetStateAction, useState } from "react";
import { SearchBar } from "./SearchBar";
import { SearchResultList } from "./SearchResultList";
import { User } from "@/app/type/user";
import { Box } from "@chakra-ui/react";
import React from "react";

type SearchInputProps = {
    selectedUser: User[]
    setSelectedUser: React.Dispatch<SetStateAction<User[]>>
}

export default function SearchInput({ selectedUser, setSelectedUser }: SearchInputProps) {
    const [searchResults, setSearchResults] = useState<User[]>([]) // Estado para armazenar os resultados da busca


    const [input, setInput] = useState("") // Estado para armazenar o valor do input de pesquisa


    const handleUserClick = (user: User) => {
        setInput('') // Limpa o input para que a box não fique exibindo
        const updatedSearchResults = searchResults.filter((result) => result.user_id !== user.user_id) // Remove o usuário clicado da lista de resultados
        setSearchResults(new Array<User>()) // Seta o resultado da busca com a lista atualizada
        setSelectedUser([...selectedUser, user]) // Adiciona o usuário clicado à lista de usuários selecionados
    }

    return (
        <Box position={"relative"} w={'auto'}>
            <SearchBar
                input={input}
                setInput={setInput}
                setSearchResults={setSearchResults}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
            /> {/* Componente da barra de pesquisa (input) */}
            {searchResults.length > 0 && ( //Se tiver resultados na busca exibe a lista de resultados
                <SearchResultList searchResults={searchResults} handleUserClick={handleUserClick} />
            )}
        </Box>
    )
}
