'use client'

import { Box, Button,Icon,Text, useStyleConfig } from "@chakra-ui/react"
import icons8_lixo from "../icons/icons8-lixo 1"
import icons8_entrar from "../icons/icons8-entrar"


export function BtnRemover(props: any) {
    const { variant, ...rest } = props
    const styles = useStyleConfig('Button', { variant })
    const styles3 = useStyleConfig('Box', { variant } )

    return (
        <Button __css={styles}  {...rest} bg='#B91717' padding={"initial"}>
            <Box __css={styles3} {...rest}>
                <Icon as={icons8_lixo} h='100%' />
            </Box>
            <Text color='#FFFFFF' 
        whiteSpace="nowrap"
        fontSize='13'
        width="75%"
        paddingLeft='5px'>Remover</Text>
        </Button>
        
    )
}




export function BtnEntrar(props: any) {
    const { variant, ...rest } = props
    const styles = useStyleConfig('Button', { variant })
    const styles3 = useStyleConfig('Box', { variant } )

    return (
        <Button __css={styles}  {...rest} bg='#900093' padding={"initial"}>
            <Box __css={styles3} {...rest}>
                <Icon as={icons8_entrar} h='100%' />
            </Box>
            <Text color='#FFFFFF' 
        whiteSpace="nowrap"
        fontSize='13'
        width="75%"
        paddingLeft='5px'>Entrar</Text>
        </Button>
        
    )
}