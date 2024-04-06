'use client'

import { Button, useStyleConfig } from "@chakra-ui/react"


export function BigBtnVisuUsuarios(props: any) {
    const {variant, ...rest} = props
    const styles = useStyleConfig('Button2', {variant})

    return (
        <Button __css={styles} {...rest} bg='#00A3AD'>Visualizar Usuários</Button>
    )
}