'use client'

import { Button } from "@chakra-ui/react"

// Botão verde que não possue ícone
export function BtnAdicionar2() {

    return (
        <Button  bg='#81BD41' 
        borderRadius= '1.25rem' 
        w='155px' 
        h='40px' 
        textAlign='center'
        textColor='#FFFFFF'
        _hover={{bg: 'gray.500'}}
        fontSize= '12'>
            Adicionar
        </Button>
    )
}