import { defineStyleConfig } from "@chakra-ui/react";

const Card = defineStyleConfig({
	// The styles all Cards have in common
	baseStyle: {
		display: 'flex',
		flexDirection: 'column',
		background: '#36D334',
		alignItems: 'center',
		borderRadius: 'full',
		gap: 6,
	},
	// Two variants: rounded and smooth
	variants: {
		rounded: {
			padding: 8,
			borderRadius: 'xl',
			boxShadow: 'xl',
		},
		smooth: {
			padding: 6,
			boxShadow: 'md',
		},
	},
	// The default variant value
	defaultProps: {
		variant: 'smooth',
	},
})

export default Card
