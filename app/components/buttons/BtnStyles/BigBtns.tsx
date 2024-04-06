import { defineStyleConfig } from "@chakra-ui/react";


export const BigBtns = defineStyleConfig({

    baseStyle: {
        borderRadius: '0.9rem',
        h: "150px",
        w: "150px",
        alignItems: 'center',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        fontSize: '12',
        textColor: '#FFFFFF',
        _hover: {
            bg: 'gray.500', // Altera o background para verde claro no hover
          },

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