'use client'

import { Box, Button, Icon, Text, useStyleConfig } from "@chakra-ui/react"
import CalendarMinus from "../icons/CalendarMinus"
import Cancel from "../icons/Cancel"



export function BtnDesmarcar(props: any) {
    const { variant, ...rest } = props
    const styles = useStyleConfig('Button', { variant })
    const styles3 = useStyleConfig('Box', { variant })

    return (
        <Button __css={styles}  {...rest} bg='#A5004F' padding={"initial"}>
            <Box __css={styles3} {...rest}>
                <Icon as={CalendarMinus} h='100%' />
            </Box>
            <Text color='#FFFFFF'
                whiteSpace="nowrap"
                fontSize='13'
                width="75%"
                paddingLeft='5px'>Recusar Reunião</Text>
        </Button>

    )
}


export function BtnCancelar(props: any) {
    const { variant, ...rest } = props
    const styles = useStyleConfig('Button', { variant })
    const styles3 = useStyleConfig('Box', { variant })

    return (
        <Button __css={styles}  {...rest} bg='#B60000' padding={"initial"}>
            <Box __css={styles3} {...rest}>
                <Icon as={Cancel} h='100%' />
            </Box>
            <Text color='#FFFFFF'
                whiteSpace="nowrap"
                fontSize='13'
                width="75%"
                paddingLeft='5px'>Cancelar</Text>
        </Button>

    )
}
