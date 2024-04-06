'use client'

import { Box,Text, Button, Icon, useStyleConfig } from "@chakra-ui/react"
import Plus from "./icons/Plus"

export function BtnAdicionar(props: any) {
    const { variant, ...rest } = props
    const styles = useStyleConfig('Button', { variant } )
    const styles2 = useStyleConfig('Text', { variant } )
    const styles3 = useStyleConfig('Box', { variant } )

    return (
        <Button __css={styles}  {...rest} bg='#81BD41' padding={"initial"}>
            <Box __css={styles3} {...rest}>
                <Icon as={Plus} h='100%' />
            </Box>
            <Text __css={styles2} {...rest}>Adicionar</Text>
        </Button>
        
    )
}