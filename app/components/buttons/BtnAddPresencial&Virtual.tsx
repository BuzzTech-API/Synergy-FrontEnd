'use client'

import { Box, Button,Icon,Text, useStyleConfig } from "@chakra-ui/react"
import Plus from "./icons/Plus"
import AddVirtual from "./icons/AddVirtual"


export function BtnAddPresencial(props: any) {
    const { variant, ...rest } = props
    const styles = useStyleConfig('Button', { variant })
    const styles2 = useStyleConfig('Text', { variant } )
    const styles3 = useStyleConfig('Box', { variant } )

    return (
        <Button __css={styles}  {...rest} bg='#36D334' padding={"initial"}>
            <Box __css={styles3} {...rest}>
                <Icon as={Plus} h='100%'/>
            </Box>
            <Text __css={styles2} {...rest}>Adicionar Presencial</Text>
        </Button>
        
    )
}


export function BtnAddVirtual(props: any) {
    const { variant, ...rest } = props
    const styles = useStyleConfig('Button', { variant })
    const styles2 = useStyleConfig('Text', { variant } )
    const styles3 = useStyleConfig('Box', { variant } )

    return (
        <Button __css={styles}  {...rest} bg='#29A1E4' padding={"initial"}>
            <Box __css={styles3} {...rest}>
                <Icon as={AddVirtual} h='100%' />
            </Box>
            <Text __css={styles2} {...rest}>Adicionar Virtual</Text>
        </Button>
        
    )
}