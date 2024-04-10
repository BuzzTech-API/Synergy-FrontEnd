'use client'

import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

/*
 * Nessa linha é utilizado uma função para
 * criar funções para stilizar o card
 * é passado a anoomia do card e pega as
 * duas funções uma para você criar os estilos por partes
 * e a outra para você montar o estilo final com o baseStyle,
 * size, variant e defaultProps.
*/
const { definePartsStyle, defineMultiStyleConfig } =
	createMultiStyleConfigHelpers(cardAnatomy.keys)

const baseStyle = definePartsStyle({
	// aqui você define o css base do componente para cada uma das partes dele
	container: {
		backgroundColor: '#F6F6F6',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		borderRadius: '1.25rem',
		gap: 6,
		boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0 ,0 ,0, 25%)",
		minW: "19rem",
		minH: "27rem",
		maxW: "19rem",
		maxH: "27rem",
		overflow: "hidden",
	},
	header: {
		paddingBottom: '2px',
		justifyContent: 'start',
		alignContent: "center",
		textAlign: 'center',
		fontSize: "2rem",
		fontFamily: '"DM Sans", sans-serif',
		textShadow: "1px 3px 3px rgba(0 ,0 ,0, 25%)",
		textColor: "#FFFFFF",
		fontWeight: "bold",
		borderRadius: '1.25rem 1.25rem 0 0',
		w: '100%',
		h: "5.5625rem",
		boxShadow: "0 0.15rem 0 0 rgba(0 ,0 ,0, 25%)",
		bgColor: "#36FA25"
	},
	body: {
		alignContent: "start",
	},
	footer: {
		paddingTop: '2px',
	},
})

const sizes = {
	// Aqui você define o css para que ele reaja aos breakpoints do chakra-ui
}

const variants = {
	// Aqui você define as variações bases de css dele
	reuniao: definePartsStyle({
		container: {
			height: '23rem',
			minHeight: '23rem',
			maxHeight: '23rem',
		}
	}),
	virtual: definePartsStyle({
		header: {
			bgColor: "#13ACEE"
		}
	}),
	presencial: definePartsStyle({
		header: {
			bgColor: "#ffa800"
		}
	}),
	deitado: {
		container: {
			minW: "67.5rem",
			minH: "3.75rem",
			alignItems: 'flex-start',
			alignContent: 'center',
			flexDirection: 'row',
		},
		body: {
			p: "0.3rem 0.9rem",
			alignItems: 'center',
			alignContent: 'center',
			justifyContent: 'center',
			flexDirection: 'row',
		}
	}
};

const CardNewStyles = defineMultiStyleConfig({ baseStyle, sizes, variants })



export default CardNewStyles; 
