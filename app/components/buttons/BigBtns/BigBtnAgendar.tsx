'use client'

import { Button, useStyleConfig } from "@chakra-ui/react"


export function BigBtnAgendar(props: any) {
    const {variant, ...rest} = props
    const styles = useStyleConfig('Button2', {variant})

    return (
        <Button __css={styles} {...rest} bg='#56009A'>Agendar</Button>
    )
}