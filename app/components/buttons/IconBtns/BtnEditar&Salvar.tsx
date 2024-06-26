'use client'

import { Box, Text, Button, Icon, useStyleConfig, ButtonProps } from "@chakra-ui/react"
import icons8_editar from "../icons/icons8-editar"
import Save from "../icons/Save"


export function BtnEditar(props: ButtonProps) {
    const { variant, ...rest } = props
    const styles = useStyleConfig('Button', { variant })
    const styles3 = useStyleConfig('Box', { variant })

    return (
        <Button __css={styles}  {...rest} bg='#FC6A00' padding={"initial"}>
            <Box __css={styles3} {...rest}>
                <Icon as={icons8_editar} h='100%' />
            </Box>
            <Text color='#FFFFFF'
                whiteSpace="nowrap"
                fontSize='13'
                width="75%"
                paddingLeft='5px'>Editar</Text>
        </Button>

    )
}



export function BtnSalvar(props: any) {
    const { variant, ...rest } = props
    const styles = useStyleConfig('Button', { variant })
    const styles3 = useStyleConfig('Box', { variant })

    return (
        <Button __css={styles}  {...rest} bg='#81BD41' padding={"initial"}>
            <Box __css={styles3} {...rest}>
                <Icon as={Save} h='100%' />
            </Box>
            <Text color='#FFFFFF'
                whiteSpace="nowrap"
                fontSize='13'
                width="75%"
                paddingLeft='5px'>Salvar Alterações</Text>
        </Button>

    )
}
