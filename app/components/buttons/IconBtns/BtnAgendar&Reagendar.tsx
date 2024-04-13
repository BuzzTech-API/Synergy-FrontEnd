'use client'

import { Box, Button,Icon,Text, useStyleConfig } from "@chakra-ui/react"
import CalendarPlus from "../icons/Agendar"
import Schedule from "../icons/Shedule"



export function BtnAgendar(props: any) {
    const { variant, ...rest } = props
    const styles = useStyleConfig('Button', { variant })
    const styles3 = useStyleConfig('Box', { variant } )

    return (
        <Button __css={styles}  {...rest} bg='#8900F5' padding={"initial"}>
            <Box __css={styles3} {...rest}>
                <Icon as={CalendarPlus} h='100%' />
            </Box>
            <Text color='#FFFFFF' 
        whiteSpace="nowrap"
        fontSize='13'
        width="75%"
        paddingLeft='5px'>Agendar</Text>
        </Button>
        
    )
}

export function BtnReagendar(props: any) {
    const { variant, ...rest } = props
    const styles = useStyleConfig('Button', { variant })
    const styles3 = useStyleConfig('Box', { variant } )

    return (
        <Button __css={styles}  {...rest} bg='#C780FF' padding={"initial"}>
            <Box __css={styles3} {...rest}>
                <Icon as={Schedule} h='100%' />
            </Box>
            <Text color='#FFFFFF' 
        whiteSpace="nowrap"
        fontSize='13'
        width="75%"
        paddingLeft='5px'>Reagendar</Text>
        </Button>
        
    )
}