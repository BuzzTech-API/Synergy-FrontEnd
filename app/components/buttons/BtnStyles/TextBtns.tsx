import { defineStyleConfig } from "@chakra-ui/react";

export const TextBtns = defineStyleConfig({
    // The styles all button have in common
    baseStyle: {
        color:'#FFFFFF', 
        whiteSpace:"nowrap",
        fontSize:'13',
        width:"75%",
        paddingLeft:'5px',
        
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