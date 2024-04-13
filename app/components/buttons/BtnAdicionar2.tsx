'use client'

import { Button } from "@chakra-ui/react"
type props = {
    onClick: () => void
}
// Botão verde que não possue ícone
export function BtnAdicionar2({ onClick }: props) {

    return (
        <Button bg='#81BD41'
            borderRadius='1.25rem'
            w='155px'
            onClick={onClick}
            h='40px'
            textAlign='center'
            textColor='#FFFFFF'
            _hover={{ bg: 'gray.500' }}
            fontSize='12'>
            Adicionar
        </Button>
    )
}
