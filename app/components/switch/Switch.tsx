// isaque falou que tem q botar "use client" pq o next tem algo com servidor e não lembro da explicação
'use client'

import { Switch, useStyleConfig } from "@chakra-ui/react"


export function SwitchPV(props: any) {

    const{variant, ...rest} = props
    const styles = useStyleConfig('Switch', {variant})

    return <Switch __css={styles} {...rest}/>

}