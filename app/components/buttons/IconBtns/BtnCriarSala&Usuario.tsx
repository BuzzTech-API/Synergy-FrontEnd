'use client'

import { Box,Text, Button, Icon, useStyleConfig } from "@chakra-ui/react"
import icons8_auditorio from "../icons/icons8-auditorio"
import icons8_usuario from "../icons/icons8-usuario"


export function BtnCriarSala(props: any) {
    const { variant, ...rest } = props
    const styles = useStyleConfig('Button', { variant })
    const styles3 = useStyleConfig('Box', { variant } )

    return (
        <Button __css={styles}  {...rest} bg='#078E05' padding={"initial"}>
            <Box __css={styles3} {...rest}>
                <Icon as={icons8_auditorio} h='100%' />
            </Box>
            <Text color='#FFFFFF' 
        whiteSpace="nowrap"
        fontSize='13'
        width="75%"
        paddingLeft='5px'>Criar Sala</Text>
        </Button>
        
    )
}


export function BtnCriarUsuario(props: any) {
    const { variant, ...rest } = props
    const styles = useStyleConfig('Button', { variant })
    const styles3 = useStyleConfig('Box', { variant } )

    return (
        <Button __css={styles}  {...rest} bg='#078E05' padding={"initial"}>
            <Box __css={styles3} {...rest}>
                <Icon as={icons8_usuario} h='100%' />
            </Box>
            <Text color='#FFFFFF' 
        whiteSpace="nowrap"
        fontSize='13'
        width="75%"
        paddingLeft='5px'>Criar Usuário</Text>
        </Button>
        
    )
}