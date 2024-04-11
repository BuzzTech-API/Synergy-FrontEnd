import { User } from "@/app/type/user"
import { SearchResult } from "./SearchResult"
import { Box } from "@chakra-ui/react"

type SearchResultListProps = {
    searchResults: User[]
    handleUserClick: (user: User) => void
}

export const SearchResultList = ({ searchResults, handleUserClick }: SearchResultListProps) => {
    return (
        <Box
            border={"0.125rem solid"}
            borderColor={'blackAlpha.400'}
            bgColor={"white"}
            display={"flex"}
            flexDirection={"column"}
            boxShadow={'0rem 0.188rem 0.188rem rgba(0, 0, 0, 0.4)'}
            borderRadius={'0.313rem'}
            mt={"0.625rem"}
            maxH={"18.75rem"}
            overflowY={"auto"}
            position="absolute"
            left="0"
            right="0"
            zIndex={100}
        >
            {
                searchResults.map((result, id) => { // Separa cada resultado em um componente
                    return <SearchResult result={result} handleUserClick={handleUserClick} key={id} />
                })
            }
        </Box>

    )
}