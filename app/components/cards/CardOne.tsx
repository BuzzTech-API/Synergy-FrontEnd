'use client'
import { Box, defineStyleConfig, useStyleConfig } from "@chakra-ui/react";

const CardNewStyles = defineStyleConfig({
	// The styles all Cards have in common
	baseStyle: {
		display: 'flex',
		flexDirection: 'column',
		background: '#F6F6F6',
		alignItems: 'center',
		borderRadius: '1.25em',
		padding: '1em',
		gap: 6,
		boxShadow: "0.1em 0.1em 0.1em 0.1em black",
		w: "19em",
		h: "27em",
	},
	// Two variants: rounded and smooth
	variants: {
		rounded: {
			padding: 8,
		},
		smooth: {
			padding: 6,
			boxShadow: 'md',
		},
	},
	// The default variant value
	defaultProps: {
		variant: 'rounded',
	},
})

export function Card(props: any) {
	const { variant, ...rest } = props
	const styles = useStyleConfig('Card', { variant })

	return <Box __css={styles} {...rest} />

}

export default CardNewStyles; 
