import { defineStyleConfig } from "@chakra-ui/react";

const Card = defineStyleConfig({
	// The styles all Cards have in common
	baseStyle: {
		display: 'flex',
		flexDirection: 'column',
		background: '#F6F6F6',
		alignItems: 'center',
		borderRadius: '1.25em',
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
