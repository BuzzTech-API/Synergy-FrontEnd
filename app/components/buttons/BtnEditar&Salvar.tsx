'use client'

import { Box,Text, Button, Icon, useStyleConfig } from "@chakra-ui/react"
import Save from "./icons/Save"
import icons8_editar from "./icons/icons8-editar"

export function BtnEditar(props: any) {
    const { variant, ...rest } = props
    const styles = useStyleConfig('Button', { variant })
    const styles2 = useStyleConfig('Text', { variant } )
    const styles3 = useStyleConfig('Box', { variant } )

    return (
        <Button __css={styles}  {...rest} bg='#FC6A00' padding={"initial"}>
            <Box __css={styles3} {...rest}>
                <Icon as={icons8_editar} h='100%' />
            </Box>
            <Text __css={styles2} {...rest}>Editar</Text>
        </Button>
        
    )
}



export function BtnSalvar(props: any) {
    const { variant, ...rest } = props
    const styles = useStyleConfig('Button', { variant })
    const styles2 = useStyleConfig('Text', { variant } )
    const styles3 = useStyleConfig('Box', { variant } )

    return (
        <Button __css={styles}  {...rest} bg='#81BD41' padding={"initial"}>
            <Box __css={styles3} {...rest}>
                <Icon as={Save} h='100%' />
            </Box>
            <Text __css={styles2} {...rest}>Salvar Alterações</Text>
        </Button>
        
    )
}