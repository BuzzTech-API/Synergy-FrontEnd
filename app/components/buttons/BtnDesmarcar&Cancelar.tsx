'use client'

import { Box, Button,Icon,Text, useStyleConfig } from "@chakra-ui/react"
import CalendarMinus from "./icons/CalendarMinus"
import Cancel from "./icons/Cancel"


export function BtnDesmarcar(props: any) {
    const { variant, ...rest } = props
    const styles = useStyleConfig('Button', { variant })
    const styles2 = useStyleConfig('Text', { variant } )
    const styles3 = useStyleConfig('Box', { variant } )

    return (
        <Button __css={styles}  {...rest} bg='#A5004F' padding={"initial"}>
            <Box __css={styles3} {...rest}>
                <Icon as={CalendarMinus} h='100%' />
            </Box>
            <Text __css={styles2} {...rest}>Desmarcar</Text>
        </Button>
        
    )
}


export function BtnCancelar(props: any) {
    const { variant, ...rest } = props
    const styles = useStyleConfig('Button', { variant })
    const styles2 = useStyleConfig('Text', { variant } )
    const styles3 = useStyleConfig('Box', { variant } )

    return (
        <Button __css={styles}  {...rest} bg='#B60000' padding={"initial"}>
            <Box __css={styles3} {...rest}>
                <Icon as={Cancel} h='100%' />
            </Box>
            <Text __css={styles2} {...rest}>Cancelar</Text>
        </Button>
        
    )
}