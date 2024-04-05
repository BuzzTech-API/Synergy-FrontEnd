import { defineStyleConfig } from '@chakra-ui/react'

export const IconsBtns = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    borderRadius: '1.25rem',
    w:"185px",
    h:"40px",
    display: 'flex',
    alignItems: 'center',
    whiteSpace:"nowrap", 
    fontSize:'11',
    overflow:'hidden',
    boxShadow: 'inset 0px -2px 5px 0px rgba(0,0,0,0.75)'
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      border: '2px solid',
      color: '#1E1E1E',
      _hover: {
        bg: 'gray.500', // Altera o background para verde claro no hover
      },
    },
    solid: {
      color: '#1E1E1E',
      _hover: {
        bg: 'gray.500', // Altera o background para verde claro no hover
      },
    },
  },
})
