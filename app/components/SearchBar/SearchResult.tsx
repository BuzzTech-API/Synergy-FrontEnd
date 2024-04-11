import { User } from "@/app/type/user"
import { Box, Divider } from "@chakra-ui/react"

type SearchResultProps = {
    result: User
    handleUserClick: (user: User) => void
}

export const SearchResult = ({ result, handleUserClick }: SearchResultProps) => {
    return (
        <>
            <Box
                alignContent={'top'}
                py={"0.625rem"}
                px={"1.25rem"}
                _hover={{ bgColor: "blue.200", cursor: "pointer" }}
                onClick={(e) => handleUserClick(result)} // Função que pega o usuario clicado e manda pro index
            >
                {result.user_name}
            </Box>
            <Divider />
        </>
    )
}