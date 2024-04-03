import { defineStyleConfig } from "@chakra-ui/react";


export const SwitchStyle = defineStyleConfig({
    //Esse define o estilo base
    baseStyle: {
        
        //Container é a parte de fora dele
        container: {},
        //Thumb é a bola
        thumb: {
            bg: '#FFA800', // Color
            h:'32px',
            w:'32px',
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",

            position: "relative",
            _before: {  //Isso é o ponto branco no meio
                content: '""',
                position: "absolute",
                w: "12px", 
                h: "12px",
                bg: "white", 
                borderRadius: "full", 
                top: "50%", 
                left: "50%", 
                transform: "translate(-50%, -50%)",
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            },
            //Cor e posição de quando está "checkado"
            _checked: {
                transform: 'translateX(40px)',
                bg: '#13ACEE',
              },
            //Transição top
            transitionProperty: 'all',
            transitionDuration: "400ms",
            transitionTimingFunction: "ease",
        },
        // Corpo do switch
        track: {
            h: '32px',
            w: '72px',
            bg: "#C6C6C6",
            _checked: {
                bg: "#C6C6C6",
                
            },
        },

    },
    // Por enquanto não tem variações nem tamanhos diferentes, quando tiver só colocar aqui
    sizes: {},
    variants: {},
    defaultProps: {},
  })

  