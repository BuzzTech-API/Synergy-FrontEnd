'use client'

import { Button, useStyleConfig } from "@chakra-ui/react"


export function BigBtnCadUsuario(props: any) {
    const {variant, ...rest} = props
    const styles = useStyleConfig('Button2', {variant})

    return (
        <Button __css={styles} {...rest} bg='#0007AD'>Cadastrar Usuário</Button>
    )
}