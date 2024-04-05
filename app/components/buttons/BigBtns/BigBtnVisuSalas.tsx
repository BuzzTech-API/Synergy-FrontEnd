'use client'

import { Button, useStyleConfig } from "@chakra-ui/react"


export function BigBtnVisuSalas(props: any) {
    const {variant, ...rest} = props
    const styles = useStyleConfig('Button2', {variant})

    return (
        <Button __css={styles} {...rest} bg='#078E05'>Visualizar Salas</Button>
    )
}